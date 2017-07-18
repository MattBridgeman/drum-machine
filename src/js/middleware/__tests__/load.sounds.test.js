import React from "react";
import { supplySoundBuffers } from "../load.sounds";
import { newAudioContext, newSoundBuffers } from "../../actions/audio.context.actions";
import { expect } from "chai";
import td from "testdouble";

describe("Load Sounds", () => {
  it("passes on all actions to next", () => {
    let next = td.function();
    let store = td.function();
    let nextAction = supplySoundBuffers(store)(next);
    nextAction({ type: "RANDOM_ACTION" });
    td.verify(next({ type: "RANDOM_ACTION" }));
  });
});