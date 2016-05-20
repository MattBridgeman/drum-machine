import { expect } from "chai";
import { changeSelectedChannel,
	toggleSoloChannel,
	changeVolumeByAmount,
	changeVolumeToAmount,
	changePitchByAmount,
	changeDecayToAmount,
	changeDecayByAmount,
	changePanToAmount,
	changePanByAmount,
	changeReverbToAmount,
	changeReverbByAmount,
	changePitchToAmount,
	toggleMuteChannel
} from "../channel.actions";

import { CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_BY_AMOUNT,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_BY_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_DECAY_BY_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	CHANGE_PAN_BY_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	CHANGE_REVERB_BY_AMOUNT,
	CHANGE_REVERB_TO_AMOUNT
} from "../../constants/channel.constants";

describe("Channel actions", function() {
	it("Expect changeVolumeByAmount to return a 'change volume value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changeVolumeByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_VOLUME_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changeVolumeToAmount to return a 'change volume value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changeVolumeToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_VOLUME_TO_AMOUNT,
			channelId,
			value
		});
	});

	it("Expect changePitchByAmount to return a 'change pitch value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changePitchByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_PITCH_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changePitchToAmount to return a 'change pitch value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changePitchToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_PITCH_TO_AMOUNT,
			channelId,
			value
		});
	});

	it("Expect changeDecayByAmount to return a 'change decay value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changeDecayByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_DECAY_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changeDecayToAmount to return a 'change decay value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changeDecayToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_DECAY_TO_AMOUNT,
			channelId,
			value
		});
	});

	it("Expect changePanByAmount to return a 'change pan value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changePanByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_PAN_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changePanToAmount to return a 'change pan value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changePanToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_PAN_TO_AMOUNT,
			channelId,
			value
		});
	});

	it("Expect changeReverbByAmount to return a 'change reverb value by amount' action", () => {
		let channelId = 0;
		let amount = 10;
		let action = changeReverbByAmount(channelId, amount);

		expect(action).to.deep.equal({
			type: CHANGE_REVERB_BY_AMOUNT,
			channelId,
			value: amount
		});
	});
	
	it("Expect changeReverbToAmount to return a 'change reverb value to amount' action", () => {
		let channelId = 0;
		let value = 10;
		let action = changeReverbToAmount(channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_REVERB_TO_AMOUNT,
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