import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { updateInstrumentAudio, cache, clearCache } from "../instrument.audio";
import * as _drumMachine from "../drum.machine";
import * as _reverb from "../reverb";
import * as _master from "../master";

describe("Instrument Audio", () => {
  it("creates a drum machine and calls update", () => {
    let instrument = {
      id: 0,
      type: "drumMachine"
    };
    let state = {
      instruments: [instrument]
    };
    let update = td.function();
    let drumMachine = td.function();
    td.when(drumMachine()).thenReturn({
      update
    });
    td.replace(_drumMachine, "createDrumMachine", drumMachine);
    updateInstrumentAudio(state);
    td.verify(drumMachine());
    td.verify(update(instrument, state));
    td.reset();
    clearCache();
  });

  it("creates a reverb and calls update", () => {
    clearCache();
    let instrument = {
      id: 0,
      type: "reverb"
    };
    let state = {
      instruments: [instrument]
    };
    let update = td.function();
    let reverb = td.function();
    td.when(reverb()).thenReturn({
      update
    });
    td.replace(_reverb, "createReverb", reverb);
    updateInstrumentAudio(state);
    td.verify(reverb());
    td.verify(update(instrument, state));
    td.reset();
  });

  it("creates a master and calls update", () => {
    clearCache();
    let instrument = {
      id: 0,
      type: "master"
    };
    let state = {
      instruments: [instrument]
    };
    let update = td.function();
    let master = td.function();
    td.when(master()).thenReturn({
      update
    });
    td.replace(_master, "createMaster", master);
    updateInstrumentAudio(state);
    td.verify(master());
    td.verify(update(instrument, state));
    td.reset();
  });

  it("returns drum machine node", () => {
    clearCache();
    let instrument = {
      id: 0,
      type: "drumMachine"
    };
    let state = {
      instruments: [instrument]
    };
    let update = td.function();
    let drumMachine = td.function();
    td.when(drumMachine()).thenReturn({
      update
    });
    td.replace(_drumMachine, "createDrumMachine", drumMachine);
    let instrumentNodes = updateInstrumentAudio(state);
    expect(instrumentNodes.length).to.equal(1);
    td.reset();
  });

  it("removes a deleted drum machine", () => {
    clearCache();
    let remove = td.function();
    cache["0"] = {
      instrument: {
        id: 0,
        type: "drumMachine"
      },
      machine: {
        update: () => null,
        remove
      }
    };
    let state = {
      instruments: []
    };
    updateInstrumentAudio(state);
    td.verify(remove());
    td.reset();
  });
});