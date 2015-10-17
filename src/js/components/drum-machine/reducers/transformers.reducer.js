import { CHANGE_TRANSFORM_BY_AMOUNT } from "../constants/drum.machine.constants";

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
			return Object.assign({}, state, { [transformId]: { value: state[transformId].value + amount } });
		default:
		return state;
	}
}