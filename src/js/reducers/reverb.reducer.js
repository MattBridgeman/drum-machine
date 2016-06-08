import { 
    CHANGE_REVERB_SECONDS_TO_AMOUNT,
    CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../constants/reverb.constants";

const initialState = {
    seconds: 100,
    decay: 100,
    reverse: false
};

export default function reverb(state = initialState, action) {
	switch (action.type) {
		case CHANGE_REVERB_SECONDS_TO_AMOUNT:
			return Object.assign({}, state, { seconds: action.value });
		case CHANGE_REVERB_DECAY_TO_AMOUNT:
			return Object.assign({}, state, { decay: action.value });
		default:
			return state;
	}
}