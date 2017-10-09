import React from "react";
import { expect } from "chai";
import { supplySoundBuffers } from "../load.sounds";
import { newAudioContext, newSoundBuffers } from "../../actions/audio.context.actions";
import * as _loadSounds from "../../library/audio-api/load.sounds";
import td from "testdouble";

describe("Load Sounds", () => {
  it("passes on all actions to next", () => {
    let next = td.function();
    let state = {};
    let store = {
      getState: () => state
    };
    let loadSounds = td.function();
    td.replace(_loadSounds, "loadSounds", loadSounds);
    let nextAction = supplySoundBuffers(store)(next);
    nextAction({ type: "RANDOM_ACTION" });
    td.verify(next({ type: "RANDOM_ACTION" }));
  });
  it("calls 'loadSounds' with state", () => {
    let next = td.function();
    let state = {};
    let store = {
      getState: () => state
    };
    let loadSounds = td.function();
    td.replace(_loadSounds, "loadSounds", loadSounds);
    let nextAction = supplySoundBuffers(store)(next);
    td.verify(loadSounds(state));
  });
});