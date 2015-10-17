import {expect} from "chai";
import patterns from "../patterns.reducer";
import { ADD_PATTERN } from "../../constants/drum.machine.constants";

describe("Patterns reducer", function() {
	function getInitialState(){
		return { 1: [1, 0, 0, 0] };
	}

	it("adds a pattern given an add pattern action", function() {
		const initialState = getInitialState();

		const action = {
			type: ADD_PATTERN,
			value: [1, 0, 1, 0]
		};

		const nextState = patterns(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({ 1: [1, 0, 0, 0], 2: [1, 0, 1, 0] });
	});

});