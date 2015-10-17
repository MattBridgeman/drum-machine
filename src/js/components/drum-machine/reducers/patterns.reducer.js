import { ADD_PATTERN } from "../constants/drum.machine.constants";

const initialState = [[1, 0, 0, 0]];

export default function patterns(state = initialState, action) {
	switch (action.type) {
		case ADD_PATTERN:
			return [...state, action.value];
		default:
			return state;
	}
}