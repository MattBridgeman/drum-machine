import React from "react";
import { supplyAudioNodes } from "../audio.nodes";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";
import { newAudioContext } from "../../actions/audio.context.actions";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Nodes", () => {
  it("passes other actions through to next", () => {
    let next = td.function();
    
    let state = {
      channels: []
    };
    let mockStore = {
      getState: () => state
    };
    let context = getStubContext();
    let nextAction = supplyAudioNodes(mockStore)(next);
    nextAction(newAudioContext(context.context));
    nextAction({ type: "RANDOM_ACTION" });
    td.verify(next({ type: "RANDOM_ACTION" }));
  });
});