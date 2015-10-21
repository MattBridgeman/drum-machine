import {expect} from "chai";
import playState from "../play.state.reducer";
import { TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX, INCREMENT_SEGMENT_INDEX } from "../../constants/play.state.constants";

function getInitialState(){
	return {
		currentSegmentIndex: 0,
		currentBarIndex: 0,
		isPlaying: false,
		looping: true
	};
}

describe("Play state reducer", function() {

	it("toggles the play state given a play pause action", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_PLAY_PAUSE
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 0,
			currentBarIndex: 0,
			isPlaying: true,
			looping: true
		});
	});

	it("changes the current segment index given a new index", function() {
		const initialState = getInitialState();

		const action = {
			type: NEW_SEGMENT_INDEX,
			value: 3
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 3,
			currentBarIndex: 0,
			isPlaying: false,
			looping: true
		});
	});

	it("increments the current segment index", function() {
		const initialState = getInitialState();

		const action = {
			type: INCREMENT_SEGMENT_INDEX
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 1,
			currentBarIndex: 0,
			isPlaying: false,
			looping: true
		});
	});

	it("returns to 0 if the next segment index is greater than a bar and looping is true", function() {

		function getLoopingState(){
			return {
				currentSegmentIndex: 15,
				currentBarIndex: 0,
				isPlaying: false,
				looping: true
			};
		}

		const initialState = getLoopingState();

		const action = {
			type: INCREMENT_SEGMENT_INDEX
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getLoopingState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 0,
			currentBarIndex: 0,
			isPlaying: false,
			looping: true
		});
	});

	it("returns to 0 if play action is triggered from pause state", function() {

		function getState(){
			return {
				currentSegmentIndex: 1,
				currentBarIndex: 0,
				isPlaying: false,
				looping: true
			};
		}

		const initialState = getState();

		const action = {
			type: TOGGLE_PLAY_PAUSE
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 0,
			currentBarIndex: 0,
			isPlaying: true,
			looping: true
		});
	});

	it("stays at current segment index if pause action is triggered from play state", function() {

		function getState(){
			return {
				currentSegmentIndex: 1,
				currentBarIndex: 0,
				isPlaying: true,
				looping: true
			};
		}

		const initialState = getState();

		const action = {
			type: TOGGLE_PLAY_PAUSE
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 1,
			currentBarIndex: 0,
			isPlaying: false,
			looping: true
		});
	});
});