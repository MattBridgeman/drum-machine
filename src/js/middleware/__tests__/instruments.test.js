import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { instruments } from "../instruments";
import * as _instrument from "../../library/audio-api/instruments/instrument.audio";
import * as _connections from "../../library/audio-api/instruments/connections";
import configureTestStore from "../../store/test.store";

describe("Instruments", () => {
  let updateInstrumentAudio;
  let updateConnections;
  beforeEach(() => {
    updateInstrumentAudio = td.function();
    updateConnections = td.function();
    td.replace(_instrument, "updateInstrumentAudio", updateInstrumentAudio);
    td.replace(_connections, "updateConnections", updateConnections);
  });
  afterEach(() => {
    td.reset();
  });
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
  it("calls updateInstrumentAudio with the instruments and store state", () => {
    let store = {
      getState: () => ({
        instruments: []
      })
    };
    let next = td.function();
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    
    td.verify(updateInstrumentAudio(td.matchers.contains({
      instruments: []
    })));
  });

  it("calls updateConnections with the instrumentNodess and store state", () => {
    let store = {
      getState: () => ({
        instruments: []
      })
    };
    let next = td.function();
    let nodes = [{outputs: { channels: [] }}];
    td.when(updateInstrumentAudio(td.matchers.anything()))
      .thenReturn(nodes);
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    
    td.verify(updateConnections(nodes, td.matchers.contains({
      instruments: []
    })));
  });
});