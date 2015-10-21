import { TOGGLE_BEAT_STATE } from "../constants/patterns.constants";

//pattern
export function toggleBeat(patternId, value, index) {
  return {
    type: TOGGLE_BEAT_STATE,
    value: { patternId, value, index }
  };
}