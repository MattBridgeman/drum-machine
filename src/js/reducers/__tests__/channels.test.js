import {expect} from "chai";
import channels from "../channels.reducer";
import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL, CHANGE_VOLUME_BY_AMOUNT, CHANGE_VOLUME_TO_AMOUNT } from "../../constants/channel.constants";

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
	
	function getInitialVolumeState(){
		return {
			0: {
				name: "volume",
				type: "gain",
				value: 50
			}
		};
	}

	it("Expect volume value to increase by amount", function() {
		const transformId = 0;
		const amount = 20;
		const initialState = getInitialVolumeState();

		const action = {
			type: CHANGE_VOLUME_BY_AMOUNT,
			value: {
				transformId,
				amount
			}
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialVolumeState());
		expect(nextState["0"].value).to.equal(70);
		expect(nextState["0"].name).to.equal(initialState["0"].name);
	});

	it("Expect volume value to increase to amount", function() {
		const transformId = 0;
		const value = 20;
		const initialState = getInitialVolumeState();

		const action = {
			type: CHANGE_VOLUME_TO_AMOUNT,
			value: {
				transformId,
				value
			}
		};

		const nextState = channels(initialState, action);

		expect(initialState).to.deep.equal(getInitialState());
		expect(nextState["0"].value).to.equal(20);
		expect(nextState["0"].name).to.equal(initialState["0"].name);
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
});