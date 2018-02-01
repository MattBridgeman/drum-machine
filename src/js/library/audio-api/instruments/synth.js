import { getAudioContext } from "../context";

export const MAX_VOICES = 16;

// Represents the state of the synth as a snapshot in time
// which will change over time
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

//TODO: action will represent keys pressed state and a time
//keys should be filtered by the max voices and ordered by startTime
//keys should persist even after key up
//but there should only be one key item per note e.g. only one a1
//the resolution at which the fn is called will determine the "responsiveness" / quality of the envlopes
//action = {
//  time: 1234
//  keys: [{ key: "a0", startTime: 0, endTime: 1111 }]
//}

let synthReducer = (state = initialState, action) => {

};

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voices = new Array(MAX_VOICES);
  let voiceNodes = null;
  let volumeNode = null;
  let panNode = null;
  let send1 = null;
  let send2 = null;

  let init = () => {
    voiceNodes = voices.map(_ => {
      return {
        oscillators: {
          osc1: context.createOscillator(),
          osc2: context.createOscillator()
        },
        gains: {
          amount: context.createGain(),
          amp: context.createGain(),
          filter: context.createBiquadFilter(),
          output: context.createGain()
        }
      };
    });
    volumeNode = context.createGain();
    panNode = context.createPanner();
    send1 = context.createGain();
    send2 = context.createGain();
  };

  let setInitialNodeState = () => {
    voiceNodes.forEach()
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    updateConnections(instrument, state);
  };

  let updateConnections = (instrument, state) => {
    //TODO: connect FM etc
  };
  
  let remove = () => {
    context = null;
  };

  init();

  return {
    update,
    remove,
    outputs: {
      main: output
    }
  }
};