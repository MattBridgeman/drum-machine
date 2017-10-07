import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createDrumMachine } from "../drum.machine";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";

describe("Drum Machine", () => {
  it("creates a drum machine", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context.context);
    let drumMachine = createDrumMachine();
    td.reset();
  });
});