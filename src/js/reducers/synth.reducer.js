import { fromJS } from "immutable"; 

import {
	CHANGE_SYNTH_PARAM
} from "../constants/synth.constants";

let initialState = {};

let defaultSynth = {
  oscillators: {
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
  fm: true,
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
  },
  filter: {
    frequency: 0,
    q: 0,
    type: "lowcut"
  },
  lfos: {
    lfo1: {
      rate: 0,
      amount: 0,
      waveType: "sine",
      connections: ["osc12"]
    },
    lfo2: {
      rate: 0,
      amount: 0,
      waveType: "square",
      connections: ["ffreq"]
    }
  },
  voices: 4,
  sends: {
    send1: 0,
    send2: 0
  },
  volume: 50,
  pan: 50
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
        default:
          return state;
      }
    default:
      return state;
  }
  return state;
};