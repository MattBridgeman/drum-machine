import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createSynth } from "../synth";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";
import * as _loadSounds from "../../load.sounds";

describe("Synth", () => {
  it("creates a synth", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    let drumMachine = createSynth();
    td.reset();
  });
});