import {expect} from "chai";
import channels from "../channels.reducer";
import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL, TOGGLE_MUTE_CHANNEL, CHANGE_VOLUME_BY_AMOUNT, CHANGE_VOLUME_TO_AMOUNT } from "../../constants/channel.constants";

describe("Channel reducer", function() {
	function getInitialState(){
		return [
			{
				sound: 0,
				patterns: [0],
				volume: 50,
				selected: true,
				solo: true,
				mute: false
			},
			{
				sound: 1,
				patterns: [1],
				volume: 50,
				solo: false,
				mute: false
			}
		];
	}

	it("Expect volume value to increase by amount", function() {
		const channelId = 0;
		const amount = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_VOLUME_BY_AMOUNT,
			channelId,
			value: amount
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[channelId].volume).to.equal(70);
	});

	it("Expect volume value to change to amount", function() {
		const channelId = 0;
		const value = 20;
		const initialState = getInitialState();

		const action = {
			type: CHANGE_VOLUME_TO_AMOUNT,
			channelId,
			value
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState[channelId].volume).to.equal(20);
	});

	it("Expect selected channel to change", function() {
		const initialState = getInitialState();

		const action = {
			type: CHANGE_SELECTED_CHANNEL,
			value: 1
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].selected).to.not.equal(true);
		expect(nextState["1"].selected).to.equal(true);
	});

	it("Expect unsolo'd channel to be solo'd", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_SOLO_CHANNEL,
			value: 1
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].solo).to.equal(true);
		expect(nextState["1"].solo).to.equal(true);
	});

	it("Expect solo'd channel to be unsolo'd", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_SOLO_CHANNEL,
			value: 0
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].solo).to.equal(false);
		expect(nextState["1"].solo).to.equal(false);
	});
	
	it("Expect unmuted channel to be muted", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_MUTE_CHANNEL,
			value: 1
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].mute).to.equal(false);
		expect(nextState["1"].mute).to.equal(true);
	});

	it("Expect muted channel to be unmuted", function() {
		const initialState = getInitialState();

		const action = {
			type: TOGGLE_MUTE_CHANNEL,
			value: 0
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].mute).to.equal(true);
		expect(nextState["1"].mute).to.equal(false);
	});
});