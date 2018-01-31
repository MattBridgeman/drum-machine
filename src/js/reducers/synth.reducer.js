let initialState = {};

let defaultSynth = {
  oscilators: {
    osc1: {
      waveType: "sine",
      octave: 0,
      semitone: 0,
      cent: 0,
      velocity: 0
    },
    osc2: {
      waveType: "square",
      octave: 0,
      semitone: 0,
      cent: 0,
      velocity: 0
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
  voices: 1,
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
  return state;
};