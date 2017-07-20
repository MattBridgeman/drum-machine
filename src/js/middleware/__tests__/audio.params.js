import React from "react";
import { updateAudioParams } from "../audio.params";
import { newSourceNodes } from "../../actions/audio.context.actions";
import { GlobalAudioContext } from "../../library/test-helpers/stubs/audio.api";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Params", () => {
  it("passes all actions to next", () => {
    
    let next = td.function();
    let state = {
      channels: [],
      reverb: {
        decay: 1,
        seconds: 1
      }
    };
    let mockStore = {
      getState: () => state
    };
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes([]));
    td.verify(next(newSourceNodes([])));
  });
  it("sets gains to correct value", () => {
    
    let next = td.function();
    let state = {
      channels: [{
        mute: false,
        solo: false,
        pan: 50
      }],
      reverb: {
        decay: 1,
        seconds: 1
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes([]));
    td.verify(next(newSourceNodes([])));
  });
});