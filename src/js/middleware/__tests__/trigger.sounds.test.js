import React from "react";
import { triggerSounds } from "../trigger.sounds";
import { expect } from "chai";
import { newAudioContext, newSoundBuffers, newSourceNodes } from "../../actions/audio.context.actions";
import { newBufferSegment } from "../../actions/buffer.actions";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";
import { togglePlayPause } from "../../actions/play.state.actions";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

describe("Play State", () => {
  it("passes 'next' onwards for all action types", () => {
    let contextStub = getStubContext();
    let sourceNodes = [];
    let soundBuffers = [];
    let store = configureTestStore();
    let next = td.function();
    let newAction = triggerSounds(store)(next);
    newAction(newAudioContext(contextStub.context));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next(newAudioContext(contextStub.context)));
    td.verify(next(newSoundBuffers(soundBuffers)));
    td.verify(next(newSourceNodes(sourceNodes)));
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });
  it("creates a decay per channel", () => {
    let contextStub = getStubContext();
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
      drumMachine: {
        0: [{
          patterns: [0]
        }, {
          patterns: [1]
        }]
      },
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
    newAction(newAudioContext(contextStub));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction(newBufferSegment(0, 1234));
    td.verify(contextStub.createGain());
    td.verify(contextStub.createGain());
  });
  it("triggers sounds for patterns with correct pitch", () => {
    let contextStub = getStubContext();
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
      drumMachine: {
        0: [{
          patterns: [0],
          pitch: 100
        }, {
          patterns: [1],
          pitch: 100
        }]
      },
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
    newAction(newAudioContext(contextStub));
    newAction(newSoundBuffers(soundBuffers));
    newAction(newSourceNodes(sourceNodes));
    newAction(newBufferSegment(0, 1234));
    td.verify(contextStub.createGain());
    td.verify(contextStub.createGain());
    td.verify(contextStub.sourceBuffer.start(1234));
    td.verify(contextStub.sourceBuffer.start(1234));
    expect(contextStub.sourceBuffer.playbackRate.value).to.equal(1.6);
  });
});