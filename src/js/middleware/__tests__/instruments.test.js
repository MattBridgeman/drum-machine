import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { instruments } from "../instruments";
import * as _instrument from "../../library/audio-api/instruments/instrument.audio";
import configureTestStore from "../../store/test.store";

describe("Instruments", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    td.replace(_instrument, "updateInstrumentAudio", td.function());
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
  it("calls updateInstrumentAudio with the instruments and store state", () => {
    let store = {
      getState: () => ({
        instruments: []
      })
    };
    let next = td.function();
    let updateInstrumentAudio = td.function();
    td.replace(_instrument, "updateInstrumentAudio", updateInstrumentAudio);
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    
    td.verify(updateInstrumentAudio(store.getState()));

    td.reset();
  })
});