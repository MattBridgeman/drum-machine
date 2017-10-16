import { expect } from "chai";
import { changeSelectedChannel,
	toggleSoloChannel,
	changeVolumeToAmount,
	changeDecayToAmount,
	changePanToAmount,
	changeReverbToAmount,
	changePitchToAmount,
	toggleReverb,
	toggleMuteChannel,
	toggleBeat,
	newBankIndex,
	changeSwingToAmount
} from "../drum.machine.actions";

import { CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	TOGGLE_REVERB,
	TOGGLE_BEAT_STATE,
	NEW_BANK_INDEX,
	CHANGE_SWING_TO_AMOUNT
} from "../../constants/drum.machine.constants";

describe("Channel actions", function() {
	
	it("Expect changeVolumeToAmount to return a 'change volume value to amount' action", () => {
		let channelId = 0;
		let machineId = 0;
		let value = 10;
		let action = changeVolumeToAmount(machineId, channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_VOLUME_TO_AMOUNT,
			channelId,
			machineId,
			value
		});
	});
	
	it("Expect changePitchToAmount to return a 'change pitch value to amount' action", () => {
		let channelId = 0;
		let machineId = 0;
		let value = 10;
		let action = changePitchToAmount(machineId, channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_PITCH_TO_AMOUNT,
			channelId,
			machineId,
			value
		});
	});
	
	it("Expect changeDecayToAmount to return a 'change decay value to amount' action", () => {
		let channelId = 0;
		let machineId = 0;
		let value = 10;
		let action = changeDecayToAmount(machineId, channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_DECAY_TO_AMOUNT,
			channelId,
			machineId,
			value
		});
	});
	
	it("Expect changePanToAmount to return a 'change pan value to amount' action", () => {
		let channelId = 0;
		let machineId = 0;
		let value = 10;
		let action = changePanToAmount(machineId, channelId, value);

		expect(action).to.deep.equal({
			type: CHANGE_PAN_TO_AMOUNT,
			channelId,
			machineId,
			value
		});
	});

	it("Expect toggleReverb to return a 'toggle reverb' action", () => {
		let channelId = 0;
		let machineId = 0;
		let value = false;
		let action = toggleReverb(machineId, channelId, value);

		expect(action).to.deep.equal({
			type: TOGGLE_REVERB,
			channelId,
			machineId,
			value
		});
	});
	
	it("Expect changeSelectedChannel to return a change selected channel action", function() {
		let machineId = 0;
		let action = changeSelectedChannel(machineId);

		expect(action.type).to.equal(CHANGE_SELECTED_CHANNEL);
	});

	it("Expect changeSelectedChannel to return the correct channel ID", function() {
		let machineId = 0;
		let newChannelId = 999;
		let action = changeSelectedChannel(machineId, newChannelId);

		expect(action.value).to.equal(newChannelId);
	});

	it("Expect toggleSoloChannel to return a toggle solo channel action", function() {
		let machineId = 0;
		let action = toggleSoloChannel(machineId);

		expect(action.type).to.equal(TOGGLE_SOLO_CHANNEL);
	});

	it("Expect toggleSoloChannel to return the correct channel ID", function() {
		let machineId = 0;
		let channelId = 999;
		let action = toggleSoloChannel(machineId, channelId);

		expect(action.value).to.equal(channelId);
	});

	it("Expect toggleMuteChannel to return a toggle Mute channel action", function() {
		let machineId = 0;
		let action = toggleMuteChannel(machineId);

		expect(action.type).to.equal(TOGGLE_MUTE_CHANNEL);
	});

	it("Expect toggleMuteChannel to return the correct channel ID", function() {
		let machineId = 0;
		let channelId = 999;
		let action = toggleMuteChannel(machineId, channelId);

		expect(action.value).to.equal(channelId);
	});

	it("Expect toggleBeat to return the correct action", function() {
		let machineId = 0;
		let channelId = 999;
		let bankId = 77;
		let index = 2;
		let value = 1.5;
		let action = toggleBeat(machineId, channelId, bankId, index, value);

		expect(action.type).to.equal(TOGGLE_BEAT_STATE);
		expect(action.machineId).to.equal(machineId);
		expect(action.channelId).to.equal(channelId);
		expect(action.bankId).to.equal(bankId);
		expect(action.index).to.equal(index);
		expect(action.value).to.equal(value);
	});

	it("Expect newBankIndex to return the correct action", function() {
		let machineId = 0;
		let bankId = 77;
		let action = newBankIndex(machineId, bankId);

		expect(action.type).to.equal(NEW_BANK_INDEX);
		expect(action.machineId).to.equal(machineId);
		expect(action.value).to.equal(bankId);
	});

	it("Expect changeSwingToAmount to return change swing to amount action", function() {
		let machineId = 0;
		let action = changeSwingToAmount(machineId, 50);

		expect(action).to.deep.equal({
			type: CHANGE_SWING_TO_AMOUNT,
			machineId,
			value: 50
		});
	});
});