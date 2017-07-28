import React from "react";
import { supplySoundBuffers } from "../load.sounds";
import { newAudioContext, newSoundBuffers } from "../../actions/audio.context.actions";
import * as _request from "../../library/audio-api/request";
import { getPromiseMock } from "../../library/test-helpers/mocks/promise";
import { expect } from "chai";
import td from "testdouble";

describe("Load Sounds", () => {
  it("passes on all actions to next", () => {
    let next = td.function();
    let store = td.function();
    let nextAction = supplySoundBuffers(store)(next);
    nextAction({ type: "RANDOM_ACTION" });
    td.verify(next({ type: "RANDOM_ACTION" }));
  });
  it("calls next with new sounds buffers", () => {
    let { promise, flush } = getPromiseMock([1234, 5678]);
    td.replace(_request, "requestAndDecodeSoundArray", (paths) => promise);
    let context = td.function();
    let next = td.function();
    let state = {
      sounds: {
        0: {
          name: "Bass Drum",
          shortName: "BD",
          path: "samples/909-2/bd01.WAV"
        },
        1: {
          name: "Snare Drum",
          shortName: "SD",
          path: "samples/909-2/sd01.WAV"
        }
      }
    };
    let mockStore = {
      getState: () => state
    };
    let nextAction = supplySoundBuffers(mockStore)(next);
    nextAction(newAudioContext(context));
    promise.then(() => {
      td.verify(next(newAudioContext(context)));
      td.verify(next(newSoundBuffers([1234, 5678])));
    });
    flush();
  });
});