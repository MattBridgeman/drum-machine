import React from "react";
import { bindActionCreators } from "redux";
import ogen from "../library/generator/ogen";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { segmentsToSchedule } from "../library/audio-api/buffer";
import { intervalGenerator, timeout } from "../library/audio-api/interval";
import DrumMachineActions from "../actions/root.actions";

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
          next(bufferActions.newBufferSegment(index, time))
        );
      },
      (err) => console.error(err),
      () => next(bufferActions.clearBufferSegments()));
  };

  let stop = () => {
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