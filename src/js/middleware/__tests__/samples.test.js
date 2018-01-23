import { samplesMiddleware } from "../samples";
import { expect } from "chai";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Samples", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = samplesMiddleware(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});