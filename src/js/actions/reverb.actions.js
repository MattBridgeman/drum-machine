import {
	CHANGE_REVERB_SECONDS_TO_AMOUNT,
	CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../constants/reverb.constants";

export function changeReverbSecondsToAmount(value){
	return {
		type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
		value
	};
}

export function changeReverbDecayToAmount(value){
	return {
		type: CHANGE_REVERB_DECAY_TO_AMOUNT,
		value
	};
}