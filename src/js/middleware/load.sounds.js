import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSoundBuffers } from "../actions/audio.context.actions";
import { requestAndDecodeSoundArray } from "../library/audio-api/request";

export const supplySoundBuffers = store => next => {
	let getSoundPaths = (store) => {
		let state = store.getState();
		let soundKeys = Object.keys(state.sounds);
		return soundKeys.map(key => state.sounds[key].path);
	};
	return action => {
		switch (action.type) {
			case NEW_AUDIO_CONTEXT:
				let context = action.value;
				requestAndDecodeSoundArray(context, getSoundPaths(store))
					.then(soundBuffers => next(newSoundBuffers(soundBuffers)));
			default:
				return next(action);
		}
	};
};