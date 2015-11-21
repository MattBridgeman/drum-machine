import { expect } from "chai";
import { changeTransformByAmount, changeTransformToAmount } from "../transformers.actions";
import { CHANGE_TRANSFORM_BY_AMOUNT, CHANGE_TRANSFORM_TO_AMOUNT } from "../../constants/transformers.constants";

describe("Transform actions", function() {

	it("Expect changeTransformByAmount to return a 'change transform value by amount' action", () => {
		let transformId = 0;
		let amount = 10;
		let action = changeTransformByAmount(transformId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_TRANSFORM_BY_AMOUNT,
			value: {
				transformId,
				amount
			}
		});
	});
	
	it("Expect changeTransformToAmount to return a 'change transform value to amount' action", () => {
		let transformId = 0;
		let value = 10;
		let action = changeTransformToAmount(transformId, value);

		expect(action).to.deep.equal({
			type: CHANGE_TRANSFORM_TO_AMOUNT,
			value: {
				transformId,
				value
			}
		});
	});
	
});