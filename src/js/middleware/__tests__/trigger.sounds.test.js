import React from "react";
import { triggerSounds } from "../trigger.sounds";
import { expect } from "chai";
import { newAudioContext, newSoundBuffers, newSourceNodes } from "../../actions/audio.context.actions";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api"
import { togglePlayPause } from "../../actions/play.state.actions";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Play State", () => {
  it("passes 'next' onwards for all action types", () => {
    let context = getStubContext();
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
  it("creates a decay per channel", () => {
    let context = getStubContext();
    let state = {
      playState: {
        currentSegmentIndex: 1,
        currentBarIndex: 0,
        isPlaying: false,
        looping: true
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4,
        swing: 0
      },
      channels: [{
        patterns: [0]
      }, {
        patterns: [1]
      }],
      patterns: {
        0: [],
        1: []
      }
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
    let newAction = triggerSounds(mockStore)(next);
    newAction(newAudioContext(context));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction(togglePlayPause());
    td.verify(context.createGain());
    td.verify(context.createGain());
  });
  it("triggers sounds for patterns", () => {
    let context = getStubContext();
    let state = {
      playState: {
        currentSegmentIndex: 0,
        currentBarIndex: 0,
        isPlaying: false,
        looping: true
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4,
        swing: 0
      },
      channels: [{
        patterns: [0]
      }, {
        patterns: [1]
      }],
      patterns: {
        0: [1,0,0,0],
        1: [1,0,0,0]
      }
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
    let newAction = triggerSounds(mockStore)(next);
    newAction(newAudioContext(context));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction(togglePlayPause());
    td.verify(context.createGain());
    td.verify(context.createGain());
  });
});