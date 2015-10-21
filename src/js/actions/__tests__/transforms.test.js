import { expect } from "chai";
import { changeTransformByAmount } from "../transformers.actions";
import { CHANGE_TRANSFORM_BY_AMOUNT } from "../../constants/transformers.constants";

describe("Transform actions", function() {

	it("Expect changeTransformByAmount to return a change transform value by amount action", function() {
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
});