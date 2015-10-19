import { TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX, INCREMENT_SEGMENT_INDEX } from "../constants/drum.machine.constants";

const initialState = {
	currentSegmentIndex: 0,
	currentBarIndex: 0,
	isPlaying: false,
	looping: true
};

export default function playState(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_PLAY_PAUSE:
			return Object.assign({}, state, {
				isPlaying: !state.isPlaying,
				currentSegmentIndex: state.isPlaying ? state.currentSegmentIndex : 0
			});
		case NEW_SEGMENT_INDEX:
			return Object.assign({}, state, { currentSegmentIndex: action.value });
		case INCREMENT_SEGMENT_INDEX:
			let currentSegmentIndex = state.looping && state.currentSegmentIndex >= 15 ? 0 : state.currentSegmentIndex + 1;
			return Object.assign({}, state, { currentSegmentIndex });
		default:
			return state;
	}
}