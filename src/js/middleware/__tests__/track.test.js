import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { track } from "../track";
import { timeout } from "../../library/audio-api/interval";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK } from "../../constants/track.constants";
import { loadDefaultTrack, newTrackLoading } from "../../actions/track.actions";
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
  it("calls action of type newTrackLoading and loadDefaultTrack if no track is loaded and there's no track id", () => {
    let get = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        }
      }
      return ret;
    };
    td.replace(timeout, "get", get);
    let context = {
      currentTime: 1234
    };
    let state = {
      router: {
        location: {
          pathname: "/"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    newAction({
      type: "A_RANDOM_ACTION"
    });
    td.verify(next({
      type: "A_RANDOM_ACTION"
    }));
    td.verify(next({
      type: NEW_TRACK_LOADING,
      trackId: "default",
      userId: undefined
    }));
    td.verify(next({
      type: LOAD_DEFAULT_TRACK
    }));
    td.reset();
  });
});