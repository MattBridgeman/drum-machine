import React from "react";
import { track } from "../track";
import { expect } from "chai";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Track", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = track(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});