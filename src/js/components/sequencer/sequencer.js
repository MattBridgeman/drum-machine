import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../drum-machine/constants/drum.machine.constants";
import { incrementSegmentIndex } from "../drum-machine/actions/drum.machine.actions";
import { segments } from "../../audio-api/sequencer";

var segmentStream;

export const sequencer = store => next => action => {
	if (action.type !== PLAY && action.type !== PAUSE && action.type !== TOGGLE_PLAY_PAUSE ) {
		return next(action);
	}
	let state = store.getState();
	if((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false)) {
		segmentStream = segments.subscribe(() => next(incrementSegmentIndex()));
	} else if ((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === true)) {
		segmentStream.dispose();
	}

	return next(action);
};