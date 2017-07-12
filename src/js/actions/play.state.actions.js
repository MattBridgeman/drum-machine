import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX, INCREMENT_SEGMENT_INDEX, NEW_BAR_INDEX } from "../constants/play.state.constants";

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

export function newSegmentIndex(value){
  return {
    type: NEW_SEGMENT_INDEX,
    value
  };
}

export function incrementSegmentIndex(value){
  return {
    type: INCREMENT_SEGMENT_INDEX,
    value
  };
}

export function newBarIndex(value){
  return {
    type: NEW_BAR_INDEX,
    value
  };
}