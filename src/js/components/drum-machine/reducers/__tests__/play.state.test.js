import {expect} from "chai";
import playState from "../play.state.reducer";
import { TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX } from "../../constants/drum.machine.constants";

function getInitialState(){
	return {
		currentSegmentIndex: 0,
		currentBarIndex: 0,
		isPlaying: false
	};
}


describe("Patterns reducer", function() {

	it("adds a pattern given an add pattern action", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_PLAY_PAUSE
		};

		const nextState = playState(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({
			currentSegmentIndex: 0,
			currentBarIndex: 0,
			isPlaying: true
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
			isPlaying: false
		});
	});
});