import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX, INCREMENT_SEGMENT_INDEX, NEW_BUFFER_SEGMENT } from "../constants/play.state.constants";

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

export function newBufferSegment(value){
  return {
    type: NEW_BUFFER_SEGMENT,
    value
  };
}
