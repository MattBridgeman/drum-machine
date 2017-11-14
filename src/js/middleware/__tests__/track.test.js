import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { track } from "../track";
import { timeout } from "../../library/audio-api/interval";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK } from "../../constants/track.constants";
import { loadDefaultTrack, newTrackLoading } from "../../actions/track.actions";
import * as db from "../../library/firebase/db";
import configureTestStore from "../../store/test.store";
import { getPromiseMock } from "../../library/test-helpers/mocks/promise";

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
  it("calls action of type newTrackLoading and loadTrack if no track is loaded and there is a track id", () => {
    let { promise, flush } = getPromiseMock();
    let get = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        }
      }
      return ret;
    };

    let loadTrack = td.function();
    td.when(loadTrack(td.matchers.anything(), td.matchers.anything())).thenResolve(() => promise);

    td.replace(timeout, "get", get);
    td.replace(db, "loadTrack", loadTrack);
    let context = {
      currentTime: 1234
    };
    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
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
    flush();

    td.verify(next({
      type: "A_RANDOM_ACTION"
    }));
    td.verify(next({
      type: NEW_TRACK_LOADING,
      trackId: "234",
      userId: "123"
    }));
    td.verify(loadTrack("123", "234"));
    td.reset();
  });
});