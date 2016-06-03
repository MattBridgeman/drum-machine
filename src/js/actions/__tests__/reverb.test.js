import { expect } from "chai";
import {
    changeReverbSecondsToAmount
} from "../reverb.actions";

import {
    CHANGE_REVERB_SECONDS_TO_AMOUNT
} from "../../constants/reverb.constants";

describe("Reverb actions", function() {
	it("Expect changeReverbSecondsToAmount to return a 'change reverb value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changeReverbSecondsToAmount(value);

		expect(action).to.deep.equal({
			type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
			value
		});
	});
});