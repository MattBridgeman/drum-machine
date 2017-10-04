import { expect } from "chai";
import { changeSelectedChannel,
	toggleSoloChannel,
	changeVolumeToAmount,
	changeDecayToAmount,
	changePanToAmount,
	changeReverbToAmount,
	changePitchToAmount,
	toggleReverb,
	toggleMuteChannel
} from "../channel.actions";

import { CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	TOGGLE_REVERB
} from "../../constants/drum.machine.constants";

describe("Channel actions", function() {
	
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

	it("Expect toggleReverb to return a 'toggle reverb' action", () => {
		let channelId = 0;
		let value = false;
		let action = toggleReverb(channelId, value);

		expect(action).to.deep.equal({
			type: TOGGLE_REVERB,
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