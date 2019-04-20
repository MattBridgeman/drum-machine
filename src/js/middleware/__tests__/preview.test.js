import { preview } from "../preview";
import td from "testdouble";
import * as _context from "../../library/audio-api/context";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";

describe("Preview", () => {
  it("passes 'next' onwards for all action types", () => {
    td.replace(_context, "getAudioContext", getStubContext);
    let store = {
      
    };
    let next = td.function();
    let newAction = preview(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});