import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { updateInstrumentAudio } from "../instrument.audio";
import * as _drumMachine from "../drum.machine";

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
    td.replace(_drumMachine, "drumMachine", drumMachine);
    updateInstrumentAudio(state);
    td.verify(drumMachine());
    td.verify(update(instrument, state));
  });
});