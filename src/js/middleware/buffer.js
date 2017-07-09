import * as React from "react";
import { bindActionCreators } from "redux";
import ogen from "../library/generator/ogen";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { segmentsToSchedule } from "../library/audio-api/buffer";
import { intervalGenerator, timeout } from "../library/audio-api/interval";
import DrumMachineActions from "../actions/drum.machine.actions";

export const LOOK_AHEAD_IN_SECONDS = 0.25;
export const LOOP_INTERVAL_IN_MILLISECONDS = LOOK_AHEAD_IN_SECONDS * 500;
export const BUFFER_DELAY_IN_SECONDS = 0.1;
export const MAX_KEEP_STALE_BUFFER_IN_SECONDS = 5;

export const buffer = store => next => {
    
  let context;
  let isPlaying = false;
  let createIntervalStream = ogen(intervalGenerator);
  let bufferActions = DrumMachineActions.buffer;

  let playPause = () => {
    let { playState } = store.getState();
    if(!playState.isPlaying && !isPlaying){
      start();
    } else if(playState.isPlaying && isPlaying) {
      stop();
    }
    return null;
  };

  let start = () => {
    if(isPlaying) return;
    isPlaying = true;
    startStream();
  };

  let startStream = () => {
    let interval = timeout.get;
    let shouldContinue = () => isPlaying;
    createIntervalStream(shouldContinue, interval)
      .subscribe(() => {
        let currentState = store.getState();
        let segments = segmentsToSchedule(context.currentTime, currentState);
        segments.forEach(({index, time}) => 
          interval().then(next(bufferActions.newBufferSegment(index, time)))
        );
      },
      (err) => console.error(err),
      () => next(bufferActions.clearBufferSegments()));
  };

  let stop = () => {
    let { dispatch } = store;
    let interval = timeout.get;
    isPlaying = false;
  };

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
  };
};