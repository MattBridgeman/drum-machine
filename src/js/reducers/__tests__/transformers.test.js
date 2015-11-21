import {expect} from "chai";
import transformers from "../transformers.reducer";
import { CHANGE_TRANSFORM_BY_AMOUNT, CHANGE_TRANSFORM_TO_AMOUNT } from "../../constants/transformers.constants";

describe("Transformer reducer", function() {
	function getInitialState(){
		return {
			0: {
				name: "volume",
				value: 50
			}
		};
	}

	it("Expect transformer value to increase by amount", function() {
		const transformId = 0;
		const amount = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_TRANSFORM_BY_AMOUNT,
			value: {
				transformId,
				amount
			}
		};

		const nextState = transformers(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].value).to.equal(70);
		expect(nextState["0"].name).to.equal(initialState["0"].name);
	});

	it("Expect transformer value to increase to amount", function() {
		const transformId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_TRANSFORM_TO_AMOUNT,
			value: {
				transformId,
				value
			}
		};

		const nextState = transformers(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].value).to.equal(20);
		expect(nextState["0"].name).to.equal(initialState["0"].name);
	});
});