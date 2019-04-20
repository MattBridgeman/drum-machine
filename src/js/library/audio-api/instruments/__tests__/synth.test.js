import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createSynth } from "../synth";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";
import * as _loadSounds from "../../load.sounds";

let synthState = {
  oscillators: {
    osc1: {
      waveType: "square",
      octave: 4,
      semitone: 0,
      cent: 0,
      amount: 50
    },
    osc2: {
      waveType: "square",
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
    type: "highpass"
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
    0: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  }
};

describe("Synth", () => {
  let context;
  beforeEach(() => {
    context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
  });
  afterEach(() => {
    td.reset();
  });
  it("creates a synth", () => {
    let synth = createSynth();
  });
  it("updates the synth params", () => {
    let synth = createSynth();
    synth.update({ machineId: 1234 }, {
      synth: {
        1234: synthState
      }
    })
  });
  it("listens to new buffers ", () => {
    let synth = createSynth();
    synth.update({ machineId: 1234 }, {
      buffer: [{
        id: 0,
        time: 0,
        duration: 0.125
      }],
      synth: {
        1234: synthState
      }
    });
  });
  it("stops the synth", () => {
    let synth = createSynth();
    synth.remove();
  });
});