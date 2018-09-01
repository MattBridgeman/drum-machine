import React from "react";
import { playState } from "../play.state";
import { expect } from "chai";
import td from "testdouble";
import { newAudioContext } from "../../actions/audio.context.actions";
import { newSegmentIndex, togglePlayPause } from "../../actions/play.state.actions";
import { timeout } from "../../library/audio-api/interval";
import { getPromiseMock } from "../../library/test-helpers/mocks/promise";
import configureTestStore from "../../store/test.store";
import { GlobalAudioContext } from "../../library/test-helpers/stubs/audio.api";

describe("Play state", () => {
  it("passes 'next' onwards for all action types", () => {
    let promise = Promise.resolve(true);
    td.replace(timeout, "get", () => promise);
    let context = {
      currentTime: 1234
    };
    let store = configureTestStore();
    let next = td.function();
    let newAction = playState(store)(next);
    newAction(newAudioContext(context));
    newAction(togglePlayPause());
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next(newAudioContext(context)));
    td.verify(next(togglePlayPause()));
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
  it("triggers new segment index", (done) => {
    let resolve;
    let { promise, flush } = getPromiseMock();
    td.replace(timeout, "get", () => promise);
    let context = {
      currentTime: 1234
    };
    let state = {
      playState: {
        currentSegmentIndex: 3,
        currentBarIndex: 0,
        isPlaying: false,
        looping: true
      },
      buffer: [{
        time: 1234,
        index: 0
      }]
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: null
    },{
      master: null
    }];
    let soundBuffers = [];
    let store = configureTestStore();
    let next = td.function();
    let newAction = playState(mockStore)(next);
    newAction(newAudioContext(context));
    newAction(togglePlayPause());
    td.verify(next(newAudioContext(context)));
    td.verify(next(togglePlayPause()));
    promise.then(() => {
      td.verify(next(newSegmentIndex(0)));
      td.reset();
      done();
    });
    flush();
  });
});