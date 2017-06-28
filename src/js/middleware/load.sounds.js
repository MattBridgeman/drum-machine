import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSoundBuffers } from "../actions/audio.context.actions";
import { loadSounds } from "../library/audio-api/load.sounds";
import { decodeAudioDataArray } from "../library/audio-api/context";

export const supplySoundBuffers = store => next => {
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