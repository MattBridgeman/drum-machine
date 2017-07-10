import React from "react";
import { triggerSounds } from "../trigger.sounds";
import { expect } from "chai";
import { newAudioContext, newSoundBuffers, newSourceNodes } from "../../actions/audio.context.actions";
import { togglePlayPause } from "../../actions/play.state.actions";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Play State", () => {
  it("passes 'next' onwards for all action types", () => {
    let context = {
      currentTime: 1234
    };
    let sourceNodes = [];
    let soundBuffers = [];
    let store = configureTestStore();
    let next = td.function();
    let newAction = triggerSounds(store)(next);
    newAction(newAudioContext(context));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next(newAudioContext(context)));
    td.verify(next(newSoundBuffers(soundBuffers)));
    td.verify(next(newSourceNodes(sourceNodes)));
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
});