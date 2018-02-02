import { createStore } from "redux";

// Represents the state of the synth as a snapshot in time
// which will change over time
//TODO: action will represent keys pressed state and a time
//keys should be filtered by the max voices and ordered by startTime
//keys should persist even after key up
//but there should only be one key item per note e.g. only one a1
//the resolution at which the fn is called will determine the "responsiveness" / quality of the envlopes
//action = {
//  time: 1234
//  keys: [{ key: "a0", startTime: 0, endTime: 1111 }]
//}
let initialState = {
  time: 0,
  oscilators: {
    osc1: {
      waveType: "sine",
      octave: 0,
      semitone: 0,
      cent: 0,
      amount: 0
    },
    osc2: {
      waveType: "square",
      octave: 0,
      semitone: 0,
      cent: 0,
      amount: 0
    }
  },
  envelopes: {
    amp: {
      attack: 0,
      decay: 0,
      sustain: 0,
      release: 0
    },
    filter: {
      attack: 0,
      decay: 0,
      sustain: 0,
      release: 0
    }
  }
};

export let synthReducer = (state = initialState, action) => {
  switch(action.type) {
    case "TIME_PASSED":
      return {
        ...state,
        time: action.time
      };
  }
  return state;
};

export let synthStore = createStore(synthReducer, initialState);