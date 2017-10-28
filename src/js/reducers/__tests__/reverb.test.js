import { expect } from "chai";
import reverb from "../reverb.reducer";
import {
    CHANGE_REVERB_SECONDS_TO_AMOUNT,
    CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../../constants/reverb.constants";
import {
	NEW_TRACK_LOADING,
	LOAD_DEFAULT_TRACK
} from "../../constants/track.constants";

describe("Reverb reducer", function() {
	function getInitialState(){
		return {
			0: {
				seconds: 100,
				decay: 100,
				reverse: false
			}
		};
	}

	it("Expect seconds value to increase to amount", function() {
		const value = 20;
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
			machineId,
			value
		};

		const nextState = reverb(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[0].seconds).to.equal(20);
	});

	it("Expect decay value to increase to amount", function() {
		const value = 20;
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_REVERB_DECAY_TO_AMOUNT,
			machineId,
			value
		};

		const nextState = reverb(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[0].decay).to.equal(20);
	});

	it("returns initial state on new track", function() {
		const initialState = getInitialState();

		const action = {
			type: NEW_TRACK_LOADING
		};

		const nextState = reverb(initialState, action);

		expect(nextState).to.deep.equal({});
	});

	it("returns default track", function() {
		const initialState = getInitialState();

		const action = {
			type: LOAD_DEFAULT_TRACK
		};

		const nextState = reverb({}, action);

		expect(nextState[0]).to.deep.equal({
			seconds: 100,
			decay: 100,
			reverse: false
		});
	});
});