import { fromJS } from "immutable"; 

import {
	CHANGE_SYNTH_PARAM
} from "../constants/synth.constants";

let initialState = {};

let defaultSynth = {
  oscillators: {
    osc1: {
      waveType: "sine",
      octave: 4,
      semitone: 0,
      cent: 0,
      amount: 100
    },
    osc2: {
      waveType: "sine",
      octave: 4,
      semitone: 0,
      cent: 0,
      amount: 100
    }
  },
  fm: true,
  envelopes: {
    amp: {
      attack: 0,
      decay: 100,
      sustain: 100,
      release: 0
    },
    filter: {
      attack: 0,
      decay: 100,
      sustain: 100,
      release: 0
    }
  },
  filter: {
    frequency: 100,
    resonance: 0,
    type: "lowpass"
  },
  lfos: {
    lfo1: {
      rate: 0,
      amount: 0,
      waveType: "sine",
      destination: ["osc12"]
    },
    lfo2: {
      rate: 0,
      amount: 0,
      waveType: "square",
      destination: ["ffreq"]
    }
  },
  voices: 4,
  sends: {
    send1: 0,
    send2: 0
  },
  volume: 50,
  pan: 50,
  currentBankIndex: 0,
  banks: {
    0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
};

let defaultState = {
  0: defaultSynth
};

export default function synth(state = defaultState, action){
  let { type, machineId, param, paramItem, value } = action;
  let $state = fromJS(state);
  switch(type) {
    case CHANGE_SYNTH_PARAM:
      machineId = machineId.toString();
      switch(param) {
        case "voices":
        case "volume":
        case "pan":
          return $state.updateIn([machineId, param], oldValue => value).toJS();
        case "osc1":
        case "osc2":
          return $state.updateIn([machineId, "oscillators", param, paramItem], oldValue => value).toJS();
        case "filter":
        case "sends":
          return $state.updateIn([machineId, param, paramItem], oldValue => value).toJS();
        case "lfo1":
        case "lfo2":
          return $state.updateIn([machineId, "lfos", param, paramItem], oldValue => value).toJS();
        case "amp":
          return $state.updateIn([machineId, "envelopes", param, paramItem], oldValue => value).toJS();
        case "env-filter":
          return $state.updateIn([machineId, "envelopes", "filter", paramItem], oldValue => value).toJS();        
        default:
          return state;
      }
    default:
      return state;
  }
  return state;
};