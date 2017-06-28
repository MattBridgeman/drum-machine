import * as React from "react";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { getSegmentsInTimespan, getSegmentTimeInSeconds } from "../library/audio-api/tempo";
import { last, numberToArrayLength } from "../library/natives/array";
import { normalisedIndex } from "../library/audio-api/play.state";
import { Buffer } from "../library/audio-api/buffer";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../actions/drum.machine.actions";

export const LOOK_AHEAD_IN_SECONDS = 0.25;
export const LOOP_INTERVAL_IN_MILLISECONDS = LOOK_AHEAD_IN_SECONDS * 500;
export const BUFFER_DELAY_IN_SECONDS = 0.1;
export const MAX_KEEP_STALE_BUFFER_IN_SECONDS = 5;

export const buffer = store => next => {
    
  let context;
  let buffer = new Buffer();

  let render = () => {
    let { playState } = this.props;
    if(playState.isPlaying && !this.isPlaying){
      this.start();
    } else if(!playState.isPlaying && this.isPlaying) {
      this.stop();
    }
    return null;
  }

  let start() => {
    if(this.isPlaying) return;
    this.isPlaying = true;
    this.buffer();
  }

  let stop() => {
    let { dispatch } = this.props;
    //clear all buffered
    //do clearing of frames that have passed
    //do queuing
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    window.setTimeout(bufferActions.clearBufferSegments, 0);
    this.isPlaying = false;
  }

  let _buffer = () => {
    if(!this.isPlaying) return;
    let { dispatch, playState, tempo, buffer, context } = this.props;
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    let currentLookAhead = context.currentTime + LOOK_AHEAD_IN_SECONDS;
    let segmentTime = getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat);
    let segmentsToBuffer = getSegmentsInTimespan(LOOK_AHEAD_IN_SECONDS, segmentTime);
    let segmentsToBufferAsArray = numberToArrayLength(segmentsToBuffer);
    let lastBuffer = last(buffer);
    //do clearing of frames that have passed
    buffer.filter(({time, id}) => 
      time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= context.currentTime
    ).forEach(({id}) => window.setTimeout(() => bufferActions.clearBufferSegment(id), 0));
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
          window.setTimeout(() => bufferActions.newBufferSegment(segmentIndex, time), 0);
        });
    }

    this.nextFrame = window.setTimeout(() => this.buffer(), LOOP_INTERVAL_IN_MILLISECONDS);
  }

	return action => {
    //do stuff
    switch(action.type) {
      case NEW_AUDIO_CONTEXT:
        context = action.value;
        return next(action);
      default:
        return next(action);
    }
  }
};