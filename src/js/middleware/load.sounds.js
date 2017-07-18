import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSoundBuffers } from "../actions/audio.context.actions";
import { decodeAudioDataArray } from "../library/audio-api/context";
import { arrayBuffer } from "../library/request/arraybuffer";

export const supplySoundBuffers = store => next => {
	let loadSounds = (store) => {
		let state = store.getState();
		let soundKeys = Object.keys(state.sounds);
		let soundPaths = soundKeys.map(key => state.sounds[key].path);
		return soundPaths.map(arrayBuffer);
	};
	return action => {
		switch (action.type) {
			case NEW_AUDIO_CONTEXT:
				let context = action.value;
				Promise.all(loadSounds(store))
					.then((promises) => decodeAudioDataArray(context, promises))
					.then(soundBuffers => next(newSoundBuffers(soundBuffers)));
			default:
				return next(action);
		}
	};
};