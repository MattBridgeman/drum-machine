import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { tracks } from "../tracks";
import { push } from "react-router-redux";
import configureTestStore from "../../store/test.store";

describe("Tracks", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = tracks(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
});