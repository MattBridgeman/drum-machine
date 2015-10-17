import { ADD_PATTERN, CHANGE_BEAT } from "../constants/drum.machine.constants";

const initialState = { 1: [1, 0, 0, 0] };

export default function patterns(state = initialState, action) {
	switch (action.type) {
		case ADD_PATTERN:
			let id = Object.keys(state).length + 1;
			return Object.assign({}, state, { [id]: action.value });
		case CHANGE_BEAT:
			let { patternId, index, value } = action.value;
			let pattern = state[patternId];
			let newPattern = pattern.map((beat, i) => i === index ? value : beat);
			return Object.assign({}, state, { [patternId]: newPattern });
		default:
			return state;
	}
}