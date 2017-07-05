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
		// const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    // dispatch(bufferActions.clearBufferSegments());
    isPlaying = false;
  }

  // const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
  // dispatch(bufferActions.newBufferSegment(segmentIndex, time));

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