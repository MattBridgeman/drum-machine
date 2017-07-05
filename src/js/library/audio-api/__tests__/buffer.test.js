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
        swing: 0
      }
    }
    let nextState = segmentsToSchedule(previousState, currentTime, store);
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
        segmentsPerBeat: 4,
        swing: 0
      }
    }
    let nextState = segmentsToSchedule(previousState, currentTime, store);
    expect(nextState).to.deep.equal([]);
  });

	it("Schedules 4th and 5th buffer when is playing and time has passed", () => {
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
        segmentsPerBeat: 4,
        swing: 0
      }
    }
    let nextState = segmentsToSchedule(previousState, currentTime, store);
    expect(nextState).to.deep.equal([{
      time: 1234.475,
      index: 3
    }, {
      time: 1234.6,
      index: 4
    }]);
	});

	it("clears a buffer that is more than 5 seconds old", () => {
		let initialContext = getStubContext();
    initialContext.currentTime = 1230;
		let secondContext = getStubContext();
    secondContext.currentTime = 1236.2;
    let dispatch = td.function();
    let initialBuffer = [];
    let secondBuffer = [{
      time: 1230.1,
      index: 0,
      id: 1111
    },{
      time: 1230.225,
      index: 1,
      id: 2222
    }];
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4,
      swing: 0
    };
		//is playing true, initialBuffer
    //is playing true, second
    let { calls } = td.explain(dispatch);
    expect(calls[2].args[0]).to.deep.equal({ type: 'clear_buffer_segment', id: 1111 });
    expect(calls[3].args[0]).to.deep.equal({ type: 'clear_buffer_segment', id: 2222 });
  });
});