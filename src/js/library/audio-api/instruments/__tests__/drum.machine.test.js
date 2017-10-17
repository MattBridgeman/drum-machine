import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createDrumMachine } from "../drum.machine";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";
import * as _loadSounds from "../../load.sounds";

describe("Drum Machine", () => {
  it("creates a drum machine", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    let drumMachine = createDrumMachine();
    td.reset();
  });
  it("returns outputs/main outputs/send1 outputs/send2 outputs/channels", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    let drumMachine = createDrumMachine();
    expect(drumMachine.outputs.main).to.exist;
    expect(drumMachine.outputs.send1).to.exist;
    expect(drumMachine.outputs.send2).to.exist;
    expect(drumMachine.outputs.channels).to.be.an("array");
    td.reset();
  });
  it("sets gains to correct values", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_loadSounds, "loadSounds", td.function());
    let drumMachine = createDrumMachine();
    let state = {
      drumMachine: {
        0: {
          channels: [{
            mute: false,
            solo: false,
            pan: 50,
            volume: 100
          }]
        }
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }],
      buffer: [],
      playState: {
        isPlaying: false
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4
      }
    };
    drumMachine.update(state.instruments["0"], state);
    expect(drumMachine.outputs.channels[0].pre.gain.value).to.equal(1);
    expect(drumMachine.outputs.channels[0].volume.gain.value).to.equal(1);
    td.reset();
  });
  it("mutes channel", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_loadSounds, "loadSounds", td.function());
    let drumMachine = createDrumMachine();
    let state = {
      drumMachine: {
        0: {
          channels: [{
            mute: true,
            solo: false,
            pan: 50,
            volume: 100
          }]
        }
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }],
      buffer: [],
      playState: {
        isPlaying: false
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4
      }
    };
    drumMachine.update(state.instruments["0"], state);
    expect(drumMachine.outputs.channels[0].pre.gain.value).to.equal(0);
    td.reset();
  });
  it("solos a single channel, muting the other", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_loadSounds, "loadSounds", td.function());
    let drumMachine = createDrumMachine();
    let state = {
      drumMachine: {
        0: {
          channels: [{
            mute: false,
            solo: false,
            pan: 50,
            volume: 100
          },{
            mute: false,
            solo: true,
            pan: 50,
            volume: 100
          }]
        }
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }],
      buffer: [],
      playState: {
        isPlaying: false
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4
      }
    };
    drumMachine.update(state.instruments["0"], state);
    expect(drumMachine.outputs.channels[0].pre.gain.value).to.equal(0);
    expect(drumMachine.outputs.channels[1].pre.gain.value).to.equal(1);
    td.reset();
  });
  it("sets pan to equally left and right", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_loadSounds, "loadSounds", td.function());
    let drumMachine = createDrumMachine();
    let state = {
      drumMachine: {
        0: {
          channels: [{
            mute: false,
            solo: false,
            pan: 50,
            volume: 100
          }]
        }
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }],
      buffer: [],
      playState: {
        isPlaying: false
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4
      }
    };
    drumMachine.update(state.instruments["0"], state);
    td.verify(drumMachine.outputs.channels[0].pan.setPosition(0, 0, 1));
    td.reset();
  });
});