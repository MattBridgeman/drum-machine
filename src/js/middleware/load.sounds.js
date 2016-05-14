import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { loadSounds } from "../library/audio-api/buffer";
import { decodeAudioDataArray } from "../library/audio-api/context";
import { Promise } from "es6-promise";

export const supplySounds = store => next => {
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