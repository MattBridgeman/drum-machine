import React from "react";
import { bindActionCreators } from "redux";
import ogen from "../library/generator/ogen";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { segmentsToSchedule } from "../library/audio-api/buffer";
import { getAudioContext } from "../library/audio-api/context";
import { intervalGenerator, timeout } from "../library/audio-api/interval";
import DrumMachineActions from "../actions/root.actions";
import rootReducer from "../reducers/root.reducer";

export const playState = store => next => {
    
  let context = getAudioContext();
  let isPlaying = false;
  let createIntervalStream = ogen(intervalGenerator);
  let playStateActions = DrumMachineActions.playState;

  let playPause = (action) => {
    let prevState = store.getState();
    let { playState } = rootReducer(prevState, action);
    if(playState.isPlaying && !isPlaying){
      start();
    } else if(!playState.isPlaying && isPlaying) {
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
        if(!buffer.length) return;
        let currentSegment = buffer.reduce((prev, curr) => {
          if(curr.time <= currentTime) return curr;
          else return prev;
        });
        if(currentSegment.index !== currentState.playState.currentSegmentIndex) {
          next(playStateActions.newSegmentIndex(currentSegment.index));
        }
      },
      (err) => console.error(err));
  };

  let stop = () => {
    isPlaying = false;
  };

	return action => {
    playPause(action);
    return next(action);
  };
};