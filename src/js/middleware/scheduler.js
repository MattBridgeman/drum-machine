import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../constants/drum.machine.constants";
import { incrementSegmentIndex } from "../actions/drum.machine.actions";
import { createSegmentStream } from "../library/audio-api/sequencer";
import { getSegmentTimeInMilliseconds } from "../library/audio-api/tempo";

var segmentStream;

export const sequencer = store => next => action => {
	if (action.type !== PLAY && action.type !== PAUSE && action.type !== TOGGLE_PLAY_PAUSE ) {
		return next(action);
	}
	let state = store.getState();
	if((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false)) {
		segmentStream = createSegmentStream(
			Date.now(),
			() => Date.now(),
			() => {
				let { beatsPerMinute, segmentsPerBeat } = state.tempo;
				return getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat);
			},
			requestAnimationFrame
		).subscribe(() => next(incrementSegmentIndex()));
	} else if ((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === true)) {
		segmentStream.dispose();
	}

	return next(action);
};