import { PLAY, TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX } from "../constants/drum.machine.constants";
import { getSegmentsToBuffer } from "../library/audio-api/tempo";

export const sequencer = store => next => action => {
	if (action.type !== PLAY && action.type !== TOGGLE_PLAY_PAUSE && action.type !== NEW_SEGMENT_INDEX) {
		return next(action);
	}
	let state = store.getState();
	let { beatsPerMinute, segmentsPerBeat } = state.tempo;
	let segmentTime = getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat);
	if((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false) || action.type !== NEW_SEGMENT_INDEX) {
		
	}

	return next(action);
};