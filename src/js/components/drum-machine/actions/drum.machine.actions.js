import { dispatcher } from "../dispatcher/drum.machine.dispatcher";
import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../constants/drum.machine.constants";

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