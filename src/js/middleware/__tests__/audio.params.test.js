import React from "react";
import { updateAudioParams } from "../audio.params";
import { newSourceNodes } from "../../actions/audio.context.actions";
import { GlobalAudioContext } from "../../library/test-helpers/stubs/audio.api";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Params", () => {
  it("sets reverb seconds and decay", () => {
    let next = td.function();
    let state = {
      drumMachine: {
        0: [{
          mute: false,
          solo: false,
          pan: 50,
          volume: 100
        }]
      },
      reverb: {
        decay: 100,
        seconds: 100
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
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    expect(sourceNodes[0].reverbNode.decay).to.equal(2);
    expect(sourceNodes[0].reverbNode.seconds).to.equal(2);
  });
});