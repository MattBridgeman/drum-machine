import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { play, pause, newSegmentIndex } from "../actions/play.state.actions";

const initialState = {
	currentSegmentIndex: 0,
	currentBarIndex: 0,
	isPlaying: false,
	looping: true
};

export default function playState(state = initialState, action) {
	switch (action.type) {
		case PLAY:
			const newState = Object.assign({}, state, {
				isPlaying: true
			});
			return playState(newState, newSegmentIndex(0));
		case PAUSE:
			return Object.assign({}, state, { isPlaying: false });
		case TOGGLE_PLAY_PAUSE:
			if(state.isPlaying){
				return playState(state, pause());
			} else {
				return playState(state, play());
			}
			break;
		case NEW_SEGMENT_INDEX:
			return Object.assign({}, state, { currentSegmentIndex: action.value });
		case INCREMENT_SEGMENT_INDEX:
			let newIndex = state.looping && state.currentSegmentIndex >= 15 ? 0 : state.currentSegmentIndex + 1;
			return playState(state, newSegmentIndex(newIndex));
		default:
			return state;
	}
}