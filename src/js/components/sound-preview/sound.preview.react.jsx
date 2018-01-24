import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { Maybe } from "../maybe/maybe.react.jsx";

const SoundPreview = props => {
  let {
    id,
    preview: {
      soundId,
      isPlaying
    },
    dispatch
  } = props;
  let previewActions = bindActionCreators(DrumMachineActions.preview, dispatch);
  let currentSoundIsPlaying = soundId === id && isPlaying;
  return <button className="preview-sound" onClick={() => {
    if(currentSoundIsPlaying){
      previewActions.pausePreview();
    } else {
      previewActions.playPreview(id);
    }
  }}>
    <Maybe condition={currentSoundIsPlaying}>
      Pause Preview
    </Maybe>
    <Maybe condition={!currentSoundIsPlaying}>
      Play Preview
    </Maybe>
  </button>;
};

export { SoundPreview };