import { expect } from "chai";
import { play, newBarIndex, pause, togglePlayPause } from "../play.state.actions";
import { NEW_BAR_INDEX, PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../../constants/play.state.constants";

describe("Play State actions", () => {

	it("returns a play action", () => {
		var action = play();

		expect(action).to.deep.equal({
			type: PLAY
		});
	});

	it("returns a pause action", () => {
		var action = pause();

		expect(action).to.deep.equal({
			type: PAUSE
		});
	});

	it("returns a togglePlayPause action", () => {
		var action = togglePlayPause();

		expect(action).to.deep.equal({
			type: TOGGLE_PLAY_PAUSE
		});
	});

	it("Expect newBarIndex to return an new bar index action", () => {
		var action = newBarIndex(3);

		expect(action).to.deep.equal({
			type: NEW_BAR_INDEX,
			value: 3
		});
	});
});