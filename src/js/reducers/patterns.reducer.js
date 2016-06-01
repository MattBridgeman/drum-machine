import { ADD_PATTERN, TOGGLE_BEAT_STATE } from "../constants/patterns.constants";

export function getInitialPattern(){
	return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function getInitialState(numberOfPatterns = 9){
	let patterns = {};
	for(let i = 0; i < numberOfPatterns; i++) {
		patterns[i] = getInitialPattern();
	}
	return patterns;
}

const initialState = getInitialState(72);

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