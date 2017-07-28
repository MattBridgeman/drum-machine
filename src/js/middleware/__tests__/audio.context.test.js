import React from "react";
import { supplyAudioContext } from "../audio.context";
import { newAudioContext } from "../../actions/audio.context.actions";
import { GlobalAudioContext } from "../../library/test-helpers/stubs/audio.api";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Context", () => {
  it("creates an audio context and passes it to next", () => {
    
    let next = td.function();
    let store = td.function();
    let nextAction = supplyAudioContext(store)(next);
    nextAction();
    td.verify(next(newAudioContext(td.matchers.anything())));
  });
  it("passes other actions through to next", () => {
    
    let next = td.function();
    let store = td.function();
    let nextAction = supplyAudioContext(store)(next);
    nextAction({ type: "SOME_RANDOM_ACTION" });
    td.verify(next(newAudioContext(td.matchers.anything())));
    td.verify(next({ type: "SOME_RANDOM_ACTION" }));
  });
});