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
    class SimpleReverb {
      connect() {
        return td.function();
      }
    };
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_SimpleReverb, "SimpleReverb", SimpleReverb);
    let reverb = createReverb();
    td.reset();
  });
  it("returns inputs/main and outputs/main", () => {
    let context = getStubContext();
    class SimpleReverb {
      connect() {
        return td.function();
      }
    };
    td.replace(_context, "getAudioContext", () => context);
    td.replace(_SimpleReverb, "SimpleReverb", SimpleReverb);
    let reverb = createReverb();
    expect(reverb.inputs.main).to.exist;
    expect(reverb.outputs.main).to.exist;
    td.reset();
  });
});