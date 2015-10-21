import { CHANGE_TRANSFORM_BY_AMOUNT } from "../constants/transformers.constants";

const initialState = {
	0: {
		name: "volume",
		value: 50
	},
	1: {
		name: "volume",
		value: 50
	}
};

export default function transformers(state = initialState, action) {
	switch (action.type) {
		case CHANGE_TRANSFORM_BY_AMOUNT:
			let { transformId, amount } = action.value;
			let transform = Object.assign({}, state[transformId], { value: state[transformId].value + amount });
			return Object.assign({}, state, { [transformId]: transform });
		default:
		return state;
	}
}