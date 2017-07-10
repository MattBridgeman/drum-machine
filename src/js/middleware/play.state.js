import * as React from "react";
import { bindActionCreators } from "redux";
import ogen from "../library/generator/ogen";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { segmentsToSchedule } from "../library/audio-api/buffer";
import { intervalGenerator, timeout } from "../library/audio-api/interval";
import DrumMachineActions from "../actions/drum.machine.actions";

export const playState = store => next => {
  //TODO: implement loop to update current segment / bar
};