import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM } from "../constants/tempo.constants";

//tempo
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
