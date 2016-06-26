import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from "../constants/play.state.constants";
import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { incrementSegmentIndex } from "../actions/play.state.actions";
import { createIntervalStream } from "../library/audio-api/interval";
import { getSegmentTimeInMilliseconds } from "../library/audio-api/tempo";
import rootReducer from "../reducers/drum.machine.root.reducer";

let createSegmentStream = (store, context) => {
	return createIntervalStream(
		() => context.currentTime,
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
	let context;
	return store => next => action => {
        if(action.type === NEW_AUDIO_CONTEXT){
			context = action.value;
		}
		if (action.type !== PLAY && action.type !== PAUSE && action.type !== TOGGLE_PLAY_PAUSE ) {
			return next(action);
		}
		let state = store.getState();
		if((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false)) {
			segmentStream = createSegmentStream(store, context).subscribe((time) => next(incrementSegmentIndex(time)));
		} else if ((action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === true)) {
			segmentStream.dispose();
		}

		return next(action);
	};
};