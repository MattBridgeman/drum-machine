import {
	CHANGE_REVERB_SECONDS_TO_AMOUNT
} from "../constants/reverb.constants";

export function changeReverbSecondsToAmount(value){
	return {
		type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
		value
	};
}