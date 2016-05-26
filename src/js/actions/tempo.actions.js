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

export function changeBPMByAmount(amount) {
  return {
    type: CHANGE_BPM_BY_AMOUNT,
    amount: amount
  };
}

export function changeBPMToAmount(value) {
  return {
    type: CHANGE_BPM,
    value: value
  };
}
