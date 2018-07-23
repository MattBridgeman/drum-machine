import TestUtils from "react-dom/test-utils";
import React from "react";
import { segmentsToSchedule, segmentsToClear, buffersSinceId } from "../buffer";
import { expect } from "chai";
import { buffer } from "rxjs/internal/operators/buffer";

const { renderIntoDocument, Simulate } = TestUtils;

describe("segments to schedule", () => {
  it("Schedules 4 segments, given no previous segments", () => {
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
        segmentsPerBeat: 4
      },
      buffer: []
    };
    let nextState = segmentsToSchedule(currentTime, store);
    expect(nextState).to.deep.equal([{
      time: 1234.1,
      index: 0
    }, {
      time: 1234.225,
      index: 1
    }, {
      time: 1234.35,
      index: 2
    }]);
  });
  it("Schedules 0 segments, given look ahead is already complete", () => {
    let currentTime = 1234.1;
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
        segmentsPerBeat: 4
      },
      buffer: [{
        time: 1234.1,
        index: 0
      }, {
        time: 1234.225,
        index: 1
      }, {
        time: 1234.35,
        index: 2
      }]
    };
    let nextState = segmentsToSchedule(currentTime, store);
    expect(nextState).to.deep.equal([]);
  });

	it("Schedules 4th and 5th buffer when is playing and time has passed", () => {
    let currentTime = 1234.225;
    let store = {
      playState: {
        currentSegmentIndex: 1,
        currentBarIndex: 0,
        isPlaying: true,
        looping: true
      },
      tempo: {
        beatsPerMinute: 120,
        beatsPerBar: 4,
        segmentsPerBeat: 4
      },
      buffer: [{
        time: 1234.1,
        index: 0
      }, {
        time: 1234.225,
        index: 1
      }, {
        time: 1234.35,
        index: 2
      }]
    };
    let nextState = segmentsToSchedule(currentTime, store);
    expect(nextState).to.deep.equal([{
      time: 1234.475,
      index: 3
    }, {
      time: 1234.6,
      index: 4
    }]);
	});

  //TODO: Follow can happen when browser window loses focus
	it("delays the clock if current time is greater than segments being scheduled", () => {
		
  });
});

describe("Segments to clear", () => {
  it("Clears segments more than 2 seconds old", () => {
    let previousState = [{
      time: 1234.1,
      index: 0
    }, {
      time: 1234.225,
      index: 1
    }, {
      time: 1234.35,
      index: 2
    }];
    let currentTime = 1239.2;

    let nextState = segmentsToClear(previousState, currentTime);
    expect(nextState).to.deep.equal([{
      time: 1234.1,
      index: 0
    }, {
      time: 1234.225,
      index: 1
    }, {
      time: 1234.35,
      index: 2
    }]);
  });
});

describe("Buffers Since Id", () => {
  it("determines buffers since a given ID", () => {
    let buffer = [{ id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6 },{ id: 7 }];
    let lastId = 3;
    expect(buffersSinceId(3,buffer)).to.deep.equal([{ id: 4 },{ id: 5 },{ id: 6 },{ id:  7}]);
  });
  it("return original buffer if Id is undefined", () => {
    let buffer = [{ id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 },{ id: 6 },{ id: 7 }];
    expect(buffersSinceId(undefined,buffer)).to.equal(buffer);
  });
});