import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../drum-machine/constants/drum.machine.constants";
import { newSegmentIndex } from "../drum-machine/actions/drum.machine.actions";
import { segments } from "../../audio-api/sequencer";

export const sequencer = store => next => action => {
	if (!action.type === PLAY && !action.type === PAUSE && !action.type === TOGGLE_PLAY_PAUSE ) {
		return next(action);
	}
	let currentSegment = segments
		.scan(0, (acc, curr) => acc + curr)
		.map(value => value - 1);

	currentSegment
		.subscribe((value) => next(newSegmentIndex(value)));

	return next(action);
};