import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../drum-machine/constants/drum.machine.constants";
import { incrementSegmentIndex } from "../drum-machine/actions/drum.machine.actions";
import { segments } from "../../audio-api/sequencer";

export const sequencer = store => next => action => {
	if (!action.type === PLAY && !action.type === PAUSE && !action.type === TOGGLE_PLAY_PAUSE ) {
		return next(action);
	}

	segments.subscribe((value) => next(incrementSegmentIndex()));

	return next(action);
};