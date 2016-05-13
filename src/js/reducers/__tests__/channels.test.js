import {expect} from "chai";
import channels from "../channels.reducer";
import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL } from "../../constants/channel.constants";

describe("Channel reducer", function() {
	function getInitialState(){
		return [
			{
				sound: 0,
				patterns: [0],
				transformers: [0],
				selected: true,
				solo: true,
				mute: false
			},
			{
				sound: 1,
				patterns: [1],
				transformers: [1],
				solo: false,
				mute: false
			}
		];
	}

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