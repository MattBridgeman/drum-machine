import { TOGGLE_PLAY_PAUSE } from "../constants/drum.machine.constants";

const initialState = {
	currentSegmentIndex: 0,
	currentBarIndex: 0,
	loopingIndex: 0,
	isPlaying: false
};

export default function playState(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_PLAY_PAUSE:
			return Object.assign({}, state, { isPlaying: !state.isPlaying });
		default:
			return state;
	}
}