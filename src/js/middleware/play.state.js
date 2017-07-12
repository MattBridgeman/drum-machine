import * as React from "react";
import { bindActionCreators } from "redux";
import ogen from "../library/generator/ogen";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { segmentsToSchedule } from "../library/audio-api/buffer";
import { intervalGenerator, timeout } from "../library/audio-api/interval";
import DrumMachineActions from "../actions/drum.machine.actions";

export const playState = store => next => {
    
  let context;
  let isPlaying = false;
  let createIntervalStream = ogen(intervalGenerator);
  let playStateActions = DrumMachineActions.playState;

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
        let { buffer } = currentState;
        let { currentTime } = context;
        let currentSegment = buffer.reduce((prev, curr) => {
          if(curr.time <= currentTime) return curr;
          else return prev;
        });
        if(currentSegment !== currentState.playState.currentSegmentIndex) {
          next(bufferActions.newSegmentIndex(currentSegment));
        }
      },
      (err) => console.error(err));
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