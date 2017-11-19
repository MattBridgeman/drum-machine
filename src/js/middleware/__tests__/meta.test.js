import { expect } from "chai";
import td from "testdouble";
import { meta } from "../meta";
import { CHANGE_TRACK_CREATED_DATE, CHANGE_TRACK_UPDATED_DATE } from "../../constants/meta.constants";
import { TRACK_SAVE } from "../../constants/track.constants";
import * as db from "../../library/firebase/db";
import * as date from "../../library/natives/date";
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

  it("saves the creation date on track dave", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = meta(store)(next);
    newAction({ type: TRACK_SAVE });

    let expectedDate = "2017-11-19T16:55:07.107Z";
    let d = td.function();
    td.when(td.matchers.anything()).thenReturn(expectedDate);

    td.verify(next({
      type: CHANGE_TRACK_CREATED_DATE,
      createdDate: expectedDate
    }));
    td.reset();
  });
});