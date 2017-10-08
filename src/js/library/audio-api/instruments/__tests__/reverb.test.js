import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createReverb } from "../reverb";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _SimpleReverb from "../../../web-audio-components/simple.reverb";
import * as _context from "../../context";

describe("Reverb", () => {
  it("creates a reverb", () => {
    let context = getStubContext();
    let SimpleReverb = () => ({
      connect: td.function()
    });
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_SimpleReverb, "SimpleReverb", SimpleReverb);
    let reverb = createReverb();
    td.reset();
  });
});