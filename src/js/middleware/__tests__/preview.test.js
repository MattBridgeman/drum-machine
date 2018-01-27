import { preview } from "../preview";
import { expect } from "chai";
import { timeout } from "../../library/audio-api/interval";
import td from "testdouble";
import * as _context from "../../library/audio-api/context";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";

describe("Preview", () => {
  it("passes 'next' onwards for all action types", () => {
    td.replace("getAudioContext", _context, getStubContext)
    let store = {
      
    };
    let next = td.function();
    let newAction = preview(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});