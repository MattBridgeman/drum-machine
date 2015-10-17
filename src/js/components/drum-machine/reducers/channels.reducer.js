import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, TOGGLE_BEAT_STATE } from "../constants/drum.machine.constants";

const initialState = {
	0: {
		sound: 0,
		patterns: [0],
		transformers: [0]
	},
	1: {
		sound: 1,
		patterns: [1],
		transformers: [1]
	}
};

export default function channels(state = initialState, action) {
	switch (action.type) {
		default:
		return state;
	}
}