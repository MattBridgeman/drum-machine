import { expect } from "chai";
import { changeSelectedChannel, toggleSoloChannel } from "../channel.actions";
import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL } from "../../constants/channel.constants";

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

	it("Expect toggleSoloChannel to return a toggle solo channel action", function() {
		var action = toggleSoloChannel();

		expect(action.type).to.equal(TOGGLE_SOLO_CHANNEL);
	});

	it("Expect toggleSoloChannel to return the correct channel ID", function() {
		var channelId = 999,
			action = toggleSoloChannel(channelId);

		expect(action.value).to.equal(channelId);
	});
});