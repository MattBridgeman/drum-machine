import { CHANGE_TRANSFORM_BY_AMOUNT, CHANGE_TRANSFORM_TO_AMOUNT } from "../constants/transformers.constants";

const initialState = {
	0: {
		name: "volume",
		value: 50
	},
	1: {
		name: "volume",
		value: 50
	},
	2: {
		name: "volume",
		value: 50
	},
	3: {
		name: "volume",
		value: 50
	},
	4: {
		name: "volume",
		value: 50
	},
	5: {
		name: "volume",
		value: 50
	},
	6: {
		name: "volume",
		value: 50
	},
	7: {
		name: "volume",
		value: 50
	},
	8: {
		name: "volume",
		value: 50
	}
};

export default function transformers(state = initialState, action) {
	let transform;
	let { transformId, amount, value } = action.value || {};
	switch (action.type) {
		case CHANGE_TRANSFORM_BY_AMOUNT:
			transform = Object.assign({}, state[transformId], { value: state[transformId].value + amount });
			return Object.assign({}, state, { [transformId]: transform });
		case CHANGE_TRANSFORM_TO_AMOUNT:
			transform = Object.assign({}, state[transformId], { value: value });
			return Object.assign({}, state, { [transformId]: transform });
		default:
		return state;
	}
}