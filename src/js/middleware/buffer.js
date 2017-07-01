import * as React from "react";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { getSegmentsInTimespan, getSegmentTimeInSeconds } from "../library/audio-api/tempo";
import { last, numberToArrayLength } from "../library/natives/array";
import { normalisedIndex } from "../library/audio-api/play.state";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../actions/drum.machine.actions";

export const LOOK_AHEAD_IN_SECONDS = 0.25;
export const LOOP_INTERVAL_IN_MILLISECONDS = LOOK_AHEAD_IN_SECONDS * 500;
export const BUFFER_DELAY_IN_SECONDS = 0.1;
export const MAX_KEEP_STALE_BUFFER_IN_SECONDS = 5;

export const buffer = store => next => {
    
  let context;
  let isPlaying = false;
  let nextFrame;

  let playPause = () => {
    let { playState } = store.getState();
    if(!playState.isPlaying && !isPlaying){
      start();
    } else if(playState.isPlaying && isPlaying) {
      stop();
    }
    return null;
  }

  let start = () => {
    if(isPlaying) return;
    isPlaying = true;
    update();
  }

  let stop = () => {
    let { dispatch } = store;
    //clear all buffered
    //do clearing of frames that have passed
    //do queuing
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    window.setTimeout(() => dispatch(bufferActions.clearBufferSegments()), 0);
    isPlaying = false;
  }

  let update = () => {
    if(!isPlaying) return;
    let { dispatch } = store;
    let { playState, tempo, buffer } = store.getState();
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    let currentLookAhead = context.currentTime + LOOK_AHEAD_IN_SECONDS;
    let segmentTime = getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat);
    let segmentsToBuffer = getSegmentsInTimespan(LOOK_AHEAD_IN_SECONDS, segmentTime);
    let segmentsToBufferAsArray = numberToArrayLength(segmentsToBuffer);
    let lastBuffer = last(buffer);
    //do clearing of frames that have passed
    buffer.filter(({time, id}) => 
      time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= context.currentTime
    ).forEach(({id}) => window.setTimeout(() => dispatch(bufferActions.clearBufferSegment(id)), 0));
    //do queuing
    if(!lastBuffer || lastBuffer.time < currentLookAhead) {
      segmentsToBufferAsArray
        .map(segmentIndex => ({
          segmentIndex: lastBuffer ? normalisedIndex(playState, tempo, lastBuffer.index + (segmentIndex + 1)) : segmentIndex,
          time: lastBuffer ? lastBuffer.time + ((1 + segmentIndex) * segmentTime) : context.currentTime + (segmentIndex * segmentTime) + BUFFER_DELAY_IN_SECONDS
        }))
        .forEach(({
          segmentIndex,
          time
        }) => {
          window.setTimeout(() => dispatch(bufferActions.newBufferSegment(segmentIndex, time)), 0);
        });
    }

    nextFrame = window.setTimeout(update, LOOP_INTERVAL_IN_MILLISECONDS);
  }

	return action => {
    //do stuff
    switch(action.type) {
      case NEW_AUDIO_CONTEXT:
        context = action.value;
        return next(action);
      case TOGGLE_PLAY_PAUSE:
        playPause();
        return next(action);
      default:
        return next(action);
    }
  }
};