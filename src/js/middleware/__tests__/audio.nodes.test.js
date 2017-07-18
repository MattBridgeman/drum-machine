import React from "react";
import { supplyAudioNodes } from "../audio.nodes";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";
import { newAudioContext, newSourceNodes } from "../../actions/audio.context.actions";
import * as _SimpleReverb from "../../library/web-audio-components/simple.reverb";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Nodes", () => {
  it("passes other actions through to next", () => {
    td.replace(_SimpleReverb, "SimpleReverb");
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
    td.reset();
  });
  it("creates a Simple Reverb node", () => {
    td.replace(_SimpleReverb, "SimpleReverb");
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
    td.verify(new _SimpleReverb.SimpleReverb(context.context, td.matchers.anything()));
    td.reset();
  });
  it("calls newSourceNodes with new source nodes", () => {
    td.replace(_SimpleReverb, "SimpleReverb");
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
    td.verify(next(newSourceNodes(td.matchers.anything())));
    td.reset();
  });
});