import { expect } from "chai";
import { changeSelectedChannel, toggleSoloChannel, changeVolumeByAmount, changeVolumeToAmount, toggleMuteChannel } from "../channel.actions";
import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL, TOGGLE_MUTE_CHANNEL, CHANGE_VOLUME_BY_AMOUNT, CHANGE_VOLUME_TO_AMOUNT } from "../../constants/channel.constants";

describe("Channel actions", function() {
	it("Expect changeVolumeByAmount to return a 'change transform value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changeVolumeByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_VOLUME_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changeVolumeToAmount to return a 'change transform value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changeVolumeToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_VOLUME_TO_AMOUNT,
			channelId,
			value
		});
	});
	
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

	it("Expect toggleMuteChannel to return a toggle Mute channel action", function() {
		var action = toggleMuteChannel();

		expect(action.type).to.equal(TOGGLE_MUTE_CHANNEL);
	});

	it("Expect toggleMuteChannel to return the correct channel ID", function() {
		var channelId = 999,
			action = toggleMuteChannel(channelId);

		expect(action.value).to.equal(channelId);
	});
});