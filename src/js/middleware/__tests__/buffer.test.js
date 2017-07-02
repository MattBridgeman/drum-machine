import TestUtils from "react-dom/test-utils";
import React from "react";
import { buffer } from "../buffer";
import { expect } from "chai";
import { NEW_AUDIO_CONTEXT } from "../../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../../constants/play.state.constants";
import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS } from "../../constants/buffer.constants";
import { last } from "../../library/natives/array";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";
import { GlobalSetTimeout, GlobalSetTimeoutTick } from "../../library/test-helpers/stubs/set.timeout";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Buffer", () => {

	it("calls dispatch twice with a buffer when is playing", () => {
		let context = getStubContext();
    context.currentTime = 1234;
    let store = configureTestStore();
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4,
      swing: 0
    };
    let next = buffer(store)(store.dispatch);
    next({
      type: NEW_AUDIO_CONTEXT,
      value: context
    });
    next({
      type: TOGGLE_PLAY_PAUSE
    });
    GlobalSetTimeoutTick();

		expect(store.getState().buffer).to.deep.equal([{
      time: 1234.1,
      index: 0
    }, {
      time: 1234.225,
      index: 1
    }]);
	});

	it("calls dispatch clearing buffer when playing stops", () => {
		let context = getStubContext();
    context.currentTime = 1234;
    let store = configureTestStore();
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4,
      swing: 0
    };
    let next = buffer(store)(store.dispatch);
    next({
      type: NEW_AUDIO_CONTEXT,
      value: context
    });
    next({
      type: TOGGLE_PLAY_PAUSE
    });
    GlobalSetTimeoutTick();
    next({
      type: TOGGLE_PLAY_PAUSE
    });
    GlobalSetTimeoutTick();
    expect(store.getState().buffer).to.deep.equal([]);
	});
  
	it("calls dispatch with a 3rd and 4th buffer when is playing and time has passed", () => {
		let initialContext = getStubContext();
    initialContext.currentTime = 1234;
		let secondContext = getStubContext();
    secondContext.currentTime = 1234.225;
    let dispatch = td.function();
    let initialBuffer = [];
    let secondBuffer = [{
      time: 1234.1,
      index: 0
    },{
      time: 1234.225,
      index: 1
    }];
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4,
      swing: 0
    };
		//is playing true, initialBuffer
    //is playing true, second
		td.verify(dispatch({
      type: NEW_BUFFER_SEGMENT,
      time: 1234.1,
      index: 0
    }));
		td.verify(dispatch({
      type: NEW_BUFFER_SEGMENT,
      time: 1234.225,
      index: 1
    }));
		td.verify(dispatch({
      type: NEW_BUFFER_SEGMENT,
      time: 1234.35,
      index: 2
    }));
		td.verify(dispatch({
      type: NEW_BUFFER_SEGMENT,
      time: 1234.475,
      index: 3
    })); 
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