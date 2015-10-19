import { ADD_PATTERN, TOGGLE_BEAT_STATE } from "../constants/drum.machine.constants";

export function getInitialPattern(){
	return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function getInitialState(){
	return {
		0: getInitialPattern(),
		1: getInitialPattern()
	};
}

const initialState = getInitialState();

export default function patterns(state = initialState, action) {
	switch (action.type) {
		case ADD_PATTERN:
			let id = Object.keys(state).length;
			return Object.assign({}, state, { [id]: action.value });
		case TOGGLE_BEAT_STATE:
			let { patternId, index, value } = action.value;
			let pattern = state[patternId];
			let newPattern = pattern.map((beat, i) => i === index ? value : beat);
			return Object.assign({}, state, { [patternId]: newPattern });
		default:
			return state;
	}
}