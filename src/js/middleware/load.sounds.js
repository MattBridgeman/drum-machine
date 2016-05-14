import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { loadSounds } from "../library/audio-api/buffer";
import { decodeAudioDataArray } from "../library/audio-api/context";
import { Promise } from "es6-promise";

export const supplySounds = store => next => {
	//loading of sounds
	let buffers = loadSounds(store);
	let context = new Promise(function(resolve, reject) {
		
	});
	let soundPromises = Promise.all(buffers)
		.then((promises) => decodeAudioDataArray(context, promises));
	let sounds = [];

	soundPromises.then(soundBuffers => soundBuffers.map(soundBuffer => sounds.push(soundBuffer)));

	return action => {
		switch (action.type) {
			case NEW_AUDIO_CONTEXT:
				break;
			default:
				return next(action);
		}
	};
};