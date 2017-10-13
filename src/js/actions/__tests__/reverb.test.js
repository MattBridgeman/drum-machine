import { expect } from "chai";
import {
    changeReverbSecondsToAmount,
    changeReverbDecayToAmount
} from "../reverb.actions";

import {
    CHANGE_REVERB_SECONDS_TO_AMOUNT,
    CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../../constants/reverb.constants";

describe("Reverb actions", function() {
	it("Expect changeReverbSecondsToAmount to return a 'change reverb value to amount' action", () => {
		let machineId = 0;
		let value = 10;
		let action = changeReverbSecondsToAmount(machineId, value);

		expect(action).to.deep.equal({
			type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
			machineId,
			value
		});
	});
	it("Expect changeReverbDecayToAmount to return a 'change reverb value to amount' action", () => {
		let machineId = 0;
		let value = 10;
		let action = changeReverbDecayToAmount(machineId, value);

		expect(action).to.deep.equal({
			type: CHANGE_REVERB_DECAY_TO_AMOUNT,
			machineId,
			value
		});
	});
});