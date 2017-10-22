import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { track } from "../track";
import configureTestStore from "../../store/test.store";

describe("Track", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = track(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
});