import React from "react";
import { bindActionCreators } from "redux";
import { getAudioContext } from "../library/audio-api/context";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";

export const startNoise = store => next => {

  let context = getAudioContext();
  let startNoisePlayed = false;
  let playStartNoise = () => {
    if(startNoisePlayed) return;
    startNoisePlayed = true;
    let channels = 2;
    let seconds = 48;
    let buffer = context.createBuffer(channels, seconds, context.sampleRate);
    for (let channel = 0; channel < channels; channel++) {
      let bit = buffer.getChannelData(channel);
      for (let i = 0; i < seconds; i++) {
        bit[i] = Math.random() * 2 - 1;
      }
    }
    let source = context.createBufferSource();
    let gain = context.createGain();
    gain.gain.value = 0.1;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(context.destination);
    source.start();
  };
  
  return action => {
    switch(action.type) {
      case TOGGLE_PLAY_PAUSE:
        playStartNoise();
        return next(action);
      default:
        return next(action);
    }
  };
};