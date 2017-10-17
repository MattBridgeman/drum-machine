import { expect } from "chai";
import drumMachine from "../drum.machine.reducer";
import {
	CHANGE_SELECTED_CHANNEL,
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

describe("Drum Machine reducer", function() {
	function getInitialState(){
		return {
			0: {
				swing: 0,
				currentBankIndex: 0,
				channels: [{
					sound: 0,
					patterns: {
						0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					},
					volume: 50,
					pitch: 50,
					decay: 100,
					pan: 50,
					reverb: true,
					selected: true,
					solo: true,
					mute: false
				},
				{
					sound: 1,
					patterns: {
						0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					},
					volume: 50,
					pitch: 50,
					decay: 100,
					pan: 50,
					reverb: false,
					solo: false,
					mute: false
				}]
			}
		};
	}

	it("Expect volume value to change to amount", function() {
		const channelId = 0;
		const machineId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_VOLUME_TO_AMOUNT,
			channelId,
			machineId,
			value
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].volume).to.equal(20);
	});

	it("Expect pitch value to change to amount", function() {
		const channelId = 0;
		const machineId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_PITCH_TO_AMOUNT,
			channelId,
			machineId,
			value
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].pitch).to.equal(20);
	});

	it("Expect decay value to change to amount", function() {
		const channelId = 0;
		const machineId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_DECAY_TO_AMOUNT,
			channelId,
			machineId,
			value
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].decay).to.equal(20);
	});

	it("Expect pan value to change to amount", function() {
		const channelId = 0;
		const machineId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_PAN_TO_AMOUNT,
			channelId,
			machineId,
			value
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].pan).to.equal(20);
	});

	it("Expect reverb value to toggle from true to false", function() {
		const channelId = 0;
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_REVERB,
			machineId,
			channelId
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].reverb).to.equal(false);
	});
	
	it("Expect reverb value to toggle from false to true", function() {
		const channelId = 1;
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_REVERB,
			machineId,
			channelId
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].reverb).to.equal(true);
	});
	
	it("Expect selected channel to change", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_SELECTED_CHANNEL,
			machineId,
			value: 1
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels["0"].selected).to.not.equal(true);
		expect(nextState[machineId].channels["1"].selected).to.equal(true);
	});

	it("Expect unsolo'd channel to be solo'd", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_SOLO_CHANNEL,
			machineId,
			value: 1
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels["0"].solo).to.equal(true);
		expect(nextState[machineId].channels["1"].solo).to.equal(true);
	});

	it("Expect solo'd channel to be unsolo'd", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_SOLO_CHANNEL,
			machineId,
			value: 0
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels["0"].solo).to.equal(false);
		expect(nextState[machineId].channels["1"].solo).to.equal(false);
	});
	
	it("Expect unmuted channel to be muted", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_MUTE_CHANNEL,
			machineId,
			value: 1
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels["0"].mute).to.equal(false);
		expect(nextState[machineId].channels["1"].mute).to.equal(true);
	});

	it("Expect muted channel to be unmuted", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_MUTE_CHANNEL,
			machineId,
			value: 0
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels["0"].mute).to.equal(true);
		expect(nextState[machineId].channels["1"].mute).to.equal(false);
	});

	it("toggles the beat for the 0 pattern bank", function() {
		const machineId = 0;
		const channelId = 1;
		const bankId = 4;
		const index = 7;
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_BEAT_STATE,
			machineId,
			channelId,
			bankId,
			index,
			value: 1
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].channels[channelId].patterns[bankId][index]).to.equal(1);
	});

	it("changes the current bank index to the new index", function() {
		const machineId = 0;
		const bankId = 4;
		const initialState = getInitialState();

		const action = {
			type: NEW_BANK_INDEX,
			machineId,
			value: bankId
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[machineId].currentBankIndex).to.equal(bankId);
	});

	it("Expect swing to change to set amount", function() {
		const machineId = 0;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_SWING_TO_AMOUNT,
			machineId,
			value: 55
		};

		const nextState = drumMachine(initialState, action);

		expect(initialState[machineId].swing).to.equal(0);
		expect(nextState[machineId].swing).to.equal(55);
	});
});