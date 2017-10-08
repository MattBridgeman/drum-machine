import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { createMaster } from "../master";
import { getStubContext } from "../../../test-helpers/stubs/audio.api";
import * as _context from "../../context";

describe("Master", () => {
  it("creates a master output", () => {
    let context = getStubContext();
    td.replace(_context, "getAudioContext", () => context);
    let drumMachine = createMaster();
    td.reset();
  });
});