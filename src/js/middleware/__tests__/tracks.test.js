import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { tracks } from "../tracks";
import { push } from "react-router-redux";
import configureTestStore from "../../store/test.store";
import * as _routing from "../../library/routing/routing";
import * as _db from "../../library/firebase/db";
import { timeout } from "../../library/audio-api/interval";
import { userTracksLoading, userTracksLoaded } from "../../actions/tracks.actions";

describe("Tracks", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = tracks(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
  it("loads user tracks when it's a user track route", () => {
    let state = {
      router: {
        location: {
          pathname: ""
        }
      }
    };
    let store = {
      getState: () => state
    };
    let promise = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        },
        catch: cb => {
          return ret;
        }
      }
      return ret;
    };
    let matchesUserTracksRoute = function(){
      return {
        params: {
          userId: 1234
        }
      }
    };
    let loadUserTracks = td.function();
    td.when(loadUserTracks(1234)).thenReturn(promise())

    td.replace(_routing, "matchesUserTracksRoute", matchesUserTracksRoute);
    td.replace(_db, "loadUserTracks", loadUserTracks);
    td.replace(timeout, "get", promise);

    let next = td.function();
    let newAction = tracks(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next(userTracksLoading(1234)));
    td.verify(loadUserTracks(1234));
    td.verify(next(userTracksLoaded(1234, td.matchers.anything())));
    td.reset();
  });
});