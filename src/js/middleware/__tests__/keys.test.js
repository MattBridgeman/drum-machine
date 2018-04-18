import { keys } from "../keys";
import { expect } from "chai";
import td from "testdouble";

describe("Keys", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = {};
    let next = td.function();
    let newAction = buffer(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});