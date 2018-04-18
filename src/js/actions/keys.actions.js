import { KEYDOWN, KEYUP } from "../constants/keys.constants";

export function onKeyDown(keyCode, keyName, time) {
	return {
		type: KEYDOWN,
    keyCode,
    keyName,
    time
	};
};

export function onKeyUp(keyCode, keyName, time) {
	return {
		type: KEYUP,
    keyCode,
    keyName,
    time
	};
};