import {expect} from "chai";
import playState from "../play.state.reducer";
import { TOGGLE_PLAY_PAUSE } from "../../constants/drum.machine.constants";

function getInitialState(){
	return {
		currentSegmentIndex: 0,
		currentBarIndex: 0,
		loopingIndex: 0,
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
			loopingIndex: 0,
			isPlaying: true
		});
	});

});