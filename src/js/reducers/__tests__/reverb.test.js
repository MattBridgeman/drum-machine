import { expect } from "chai";
import reverb from "../reverb.reducer";
import {
    CHANGE_REVERB_SECONDS_TO_AMOUNT
} from "../../constants/reverb.constants";

describe("Reverb reducer", function() {
	function getInitialState(){
		return {
            seconds: 100,
            decay: 100,
            reverse: false
        };
	}

	it("Expect seconds value to increase to amount", function() {
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
			value
		};

		const nextState = reverb(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState.seconds).to.equal(20);
	});

});