import React from "react";
import { instruments } from "../instruments";
import { expect } from "chai";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Instruments", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = instruments(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});