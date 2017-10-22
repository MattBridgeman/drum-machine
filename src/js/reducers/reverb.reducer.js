import { 
    CHANGE_REVERB_SECONDS_TO_AMOUNT,
    CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../constants/reverb.constants";
import {
	NEW_TRACK_LOADING
} from "../constants/track.constants";

const initialState = {};

const defaultState = {
	0: {
		seconds: 100,
		decay: 100,
		reverse: false
	}
};

export default function reverb(state = initialState, action) {
	switch (action.type) {
		case CHANGE_REVERB_SECONDS_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					seconds: action.value
				}
			};
		case CHANGE_REVERB_DECAY_TO_AMOUNT:
			return {
				...state, 
				[action.machineId]: {
					...state[action.machineId],
					decay: action.value
				}
			};
		case NEW_TRACK_LOADING:
			return initialState;
		default:
			return state;
	}
}