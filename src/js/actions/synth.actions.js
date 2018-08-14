import {
	CHANGE_SYNTH_PARAM
} from "../constants/synth.constants";

export function changeSynthParam(machineId, param, paramItem, value){
	return {
		type: CHANGE_SYNTH_PARAM,
		param,
		paramItem,
		value
	};
}
