import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../drum-machine/constants/drum.machine.constants";

export const sequencer = store => next => action => {
	if (!action.type === PLAY && !action.type === PAUSE && !action.type === TOGGLE_PLAY_PAUSE ) {
		return next(action);
	}
	console.log("play");
	return next(action);
};