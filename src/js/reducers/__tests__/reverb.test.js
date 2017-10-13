import { expect } from "chai";
import reverb from "../reverb.reducer";
import {
    CHANGE_REVERB_SECONDS_TO_AMOUNT,
    CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../../constants/reverb.constants";

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

});