import { expect } from "chai";
import td from "testdouble";
import { meta } from "../meta";
import { TRACK_SAVE } from "../../constants/meta.constants";
import * as db from "../../library/firebase/db";
import configureTestStore from "../../store/test.store";

describe("Meta", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = meta(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
});