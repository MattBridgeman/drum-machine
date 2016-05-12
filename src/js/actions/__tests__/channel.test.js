import { expect } from "chai";
import { changeSelectedChannel } from "../channel.actions";
import { CHANGE_SELECTED_CHANNEL } from "../../constants/channel.constants";

describe("Channel actions", function() {

	it("Expect changeSelectedChannel to return a change selected channel action", function() {
		var action = changeSelectedChannel();

		expect(action.type).to.equal(CHANGE_SELECTED_CHANNEL);
	});

	it("Expect changeSelectedChannel to return the correct channel ID", function() {
		var newChannelId = 999,
			action = changeSelectedChannel(newChannelId);

		expect(action.value).to.equal(newChannelId);
	});
});