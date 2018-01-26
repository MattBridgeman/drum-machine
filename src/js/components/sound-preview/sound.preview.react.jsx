import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { Maybe } from "../maybe/maybe.react.jsx";

const SoundPreview = props => {
  let {
    id,
    userId,
    preview: {
      soundId,
      state
    },
    dispatch
  } = props;
  let previewActions = bindActionCreators(DrumMachineActions.preview, dispatch);
  let currentSoundIsPlaying = soundId === id && state === "playing";
  let currentSoundIsLoading = soundId === id && state === "loading";
  return <button className="preview-sound" onClick={() => {
    if(currentSoundIsPlaying){
      previewActions.pausePreview();
    } else {
      previewActions.playPreview(userId, id);
    }
  }}>
    <Maybe condition={currentSoundIsPlaying}>
      <span className="icon icon__pause"></span>
      <span className="preview-sound__label">Pause</span>
    </Maybe>
    <Maybe condition={currentSoundIsLoading}>
      <span className="icon icon__loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </span>
      <span className="preview-sound__label">Loading</span>
    </Maybe>
    <Maybe condition={!currentSoundIsPlaying && !currentSoundIsLoading}>
      <span className="icon icon__play"></span>    
      <span className="preview-sound__label">Play</span>  
    </Maybe>
  </button>;
};

export { SoundPreview };