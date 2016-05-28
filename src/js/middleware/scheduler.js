import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { incrementSegmentIndex } from "../actions/play.state.actions";
import { createIntervalStream } from "../library/audio-api/interval";
import { getSegmentTimeInMilliseconds } from "../library/audio-api/tempo";
import rootReducer from "../reducers/drum.machine.root.reducer";

let createSegmentStream = (store) => {
	return createIntervalStream(
		Date.now(),
		() => Date.now(),
		() => {
			let prevState = store.getState();
			let futureState = rootReducer(prevState, incrementSegmentIndex());
			let { beatsPerMinute, segmentsPerBeat, swing } = futureState.tempo;
			let { currentSegmentIndex } = futureState.playState;
			return getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat, currentSegmentIndex, swing);
		},
		requestAnimationFrame,
		cancelAnimationFrame
	);
};

export const sequencer = () => {
	let segmentStream;
	return store => next => action => {
		if (action.type !== PLAY && action.type !== PAUSE && action.type !== TOGGLE_PLAY_PAUSE ) {
			return next(action);
		}
		let state = store.getState();
		if((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false)) {
			segmentStream = createSegmentStream(store).subscribe(() => next(incrementSegmentIndex()));
		} else if ((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === true)) {
			segmentStream.dispose();
		}

		return next(action);
	};
};