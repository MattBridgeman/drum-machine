import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, TOGGLE_BEAT_STATE, INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM, CHANGE_TRANSFORM_BY_AMOUNT } from "../constants/drum.machine.constants";

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

export function toggleBeat(patternId, value, index) {
  return {
    type: TOGGLE_BEAT_STATE,
    value: { patternId, value, index }
  };
}

export function incrementBPM() {
  return {
    type: INCREMENT_BPM
  };
}

export function decrementBPM() {
  return {
    type: DECREMENT_BPM
  };
}

export function changeBPMByAmount() {
  return {
    type: CHANGE_BPM_BY_AMOUNT
  };
}

export function changeBPM() {
  return {
    type: CHANGE_BPM
  };
}

export function changeTransformByAmount(transformId, amount){
  return {
    type: CHANGE_TRANSFORM_BY_AMOUNT,
    value: {
      transformId,
      amount
    }
  }
}