import { ADD_PATTERN } from "../constants/drum.machine.constants";

const initialState = { 1: [1, 0, 0, 0] };

export default function patterns(state = initialState, action) {
	switch (action.type) {
		case ADD_PATTERN:
			let id = Object.keys(state).length + 1;
			return Object.assign({}, state, { [id]: action.value });
		default:
			return state;
	}
}