import {
	CHANGE_REVERB_SECONDS_TO_AMOUNT,
	CHANGE_REVERB_DECAY_TO_AMOUNT
} from "../constants/reverb.constants";

export function changeReverbSecondsToAmount(machineId, value){
	return {
		type: CHANGE_REVERB_SECONDS_TO_AMOUNT,
		machineId,
		value
	};
}

export function changeReverbDecayToAmount(machineId, value){
	return {
		type: CHANGE_REVERB_DECAY_TO_AMOUNT,
		machineId,
		value
	};
}