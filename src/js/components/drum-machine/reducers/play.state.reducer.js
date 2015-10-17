import { TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX } from "../constants/drum.machine.constants";

const initialState = {
	currentSegmentIndex: 0,
	currentBarIndex: 0,
	isPlaying: false
};

export default function playState(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_PLAY_PAUSE:
			return Object.assign({}, state, { isPlaying: !state.isPlaying });
		case NEW_SEGMENT_INDEX:
			return Object.assign({}, state, { currentSegmentIndex: action.value });
		default:
			return state;
	}
}