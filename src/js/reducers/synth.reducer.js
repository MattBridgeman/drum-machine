import { fromJS } from "immutable"; 

import {
	CHANGE_SYNTH_PARAM
} from "../constants/synth.constants";
import {
	NEW_TRACK_LOADING,
	LOAD_DEFAULT_TRACK,
	NEW_TRACK_LOADED
} from "../constants/track.constants";
import { ON_NEW_INSTRUMENT, DELETE_INSTRUMENT } from "../constants/instruments.constants";

let initialState = {};

let defaultSynth = {
  oscillators: {
    osc1: {
      waveType: "sine",
      octave: 4,
      semitone: 0,
      cent: 0,
      amount: 50
    },
    osc2: {
      waveType: "sine",
      octave: 4,
      semitone: 0,
      cent: 0,
      amount: 50
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
      release: 0,
      amount: 0
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
    0: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    1: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    2: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    3: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    4: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    5: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    6: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    7: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
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
        case "pattern-item":
          return $state.updateIn([machineId, "banks", ...paramItem.split('.')], oldValue => value).toJS();       
        default:
          return state;
      }
    case NEW_TRACK_LOADING:
			return initialState;
		case LOAD_DEFAULT_TRACK:
			return defaultState;
		case NEW_TRACK_LOADED:
      return action.synth || initialState;
		case ON_NEW_INSTRUMENT:
      if(action.instrumentType === "synth"){
        return $state.set(machineId, defaultSynth).toJS();
      }
      return state;
    case DELETE_INSTRUMENT:
      if(action.instrumentType === "synth"){
				return $state.delete(machineId.toString()).toJS();
      }
      return state;
    default:
      return state;
  }
};