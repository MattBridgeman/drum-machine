import {expect} from "chai";
import patterns from "../patterns.reducer";
import { ADD_PATTERN, CHANGE_BEAT } from "../../constants/drum.machine.constants";

function getInitialPattern(){
	return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function getInitialState(){
	return {
		0: getInitialPattern()
	};
}


describe("Patterns reducer", function() {

	it("adds a pattern given an add pattern action", function() {
		const initialState = getInitialState();

		const action = {
			type: ADD_PATTERN,
			value: [1, 0, 1, 0]
		};

		const nextState = patterns(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({ 0: getInitialPattern(), 1: [1, 0, 1, 0] });
	});

	it("change beat in a pattern given a change beat action", function() {
		const initialState = getInitialState();

		const action = {
			type: CHANGE_BEAT,
			value: { patternId: 0, index: 2, value: 1 }
		};

		const nextState = patterns(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState).to.deep.equal({ 0: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
	});
});