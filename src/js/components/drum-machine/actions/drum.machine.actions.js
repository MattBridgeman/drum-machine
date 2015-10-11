import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, TOGGLE_BEAT_STATE, INCREMENT_BPM } from "../constants/drum.machine.constants";

export function play() {
  return {
    type: PLAY
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function togglePlayPause() {
  return {
    type: TOGGLE_PLAY_PAUSE
  };
}

export function toggleBeat(beatId) {
  return {
    type: TOGGLE_BEAT_STATE,
    id: beatId
  };
}

export function incrementBPM() {
  return {
    type: INCREMENT_BPM
  };
}