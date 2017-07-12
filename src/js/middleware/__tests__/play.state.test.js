import React from "react";
import { playState } from "../play.state";
import { expect } from "chai";
import { newAudioContext } from "../../actions/audio.context.actions";
import { newSegmentIndex } from "../../actions/play.state.actions";
import { togglePlayPause } from "../../actions/play.state.actions";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Play state", () => {
  it("passes 'next' onwards for all action types", () => {
    let promise = Promise.resolve(true);
    td.replace(timeout, "timeout", () => promise);
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
  });
});