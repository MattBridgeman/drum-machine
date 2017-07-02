import TestUtils from "react-dom/test-utils";
import React from "react";
import { segmentsToSchedule } from "../buffer";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Add buffer", () => {
  it("Schedules 4 segments, given no previous segments", () => {
    let previousState = [];
    let currentTime = 1234;
    let store = {
      playState: {
        currentSegmentIndex: 0,
        currentBarIndex: 0,
        isPlaying: true,
        looping: true
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4,
        swing: 15
      }
    }
    let nextState = segmentsToSchedule(previousState, currentTime, store);
    expect(nextState).to.deep.equal([{
      time: 1234.1,
      index: 0
    }, {
      time: 1234.225,
      index: 1
    }]);
  });
});