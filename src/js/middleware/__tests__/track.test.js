import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { track } from "../track";
import { timeout } from "../../library/audio-api/interval";
import { NEW_TRACK_LOADING } from "../../constants/track.constants";
import { loadDefaultTrack } from "../../actions/track.actions";
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
  it("calls action of type loadDefaultTrack if trackId is default", () => {
    let then = (cb) => cb();
    let get = () => ({ then });
    td.replace(timeout, "get", get);
    let context = {
      currentTime: 1234
    };
    let store = configureTestStore();
    let next = td.function();
    let newAction = track(store)(next);
    newAction({
      type: NEW_TRACK_LOADING,
      userId: undefined,
      trackId: "default"
    });
    td.verify(next(loadDefaultTrack()));
  });
});