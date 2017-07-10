import React from "react";
import { buffer } from "../buffer";
import { expect } from "chai";
import { newAudioContext } from "../../actions/audio.context.actions";
import { togglePlayPause } from "../../actions/play.state.actions";
import { newBufferSegment } from "../../actions/buffer.actions";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Buffer", () => {
  it("passes 'next' onwards for all action types", () => {
    let promise = Promise.resolve(true);
    td.replace(timeout, "timeout", () => promise);
    let context = {
      currentTime: 1234
    };
    let store = configureTestStore();
    let next = td.function();
    let newAction = buffer(store)(next);
    newAction(newAudioContext(context));
    newAction(togglePlayPause());
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next(newAudioContext(context)));
    td.verify(next(togglePlayPause()));
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
  //TODO: Figure out how to test life cycle of this middleware
  it("calls store dispatch with new segments when play starts", () => {
    // let promise = Promise.resolve(true);
    // td.replace(timeout, "timeout", () => promise);
    // let context = {
    //   currentTime: 1234
    // };
    // let store = configureTestStore();
    // let next = td.function();
    // let newAction = buffer(store)(next);
    // newAction(newAudioContext(context));
    // newAction(togglePlayPause());
    // td.verify(next(newAudioContext(context)));
    // td.verify(next(togglePlayPause()));
    // return promise.then(() => 
    //   Promise.resolve(true).then(td.verify(next(newBufferSegment({
    // })))));
  });
});