import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";
import { newSoundBuffers } from "../actions/audio.context.actions";
import { loadSounds } from "../library/audio-api/load.sounds";

export const supplySoundBuffers = store => next => {
	let state = store.getState();
	loadSounds(state);
	return action => {
		return next(action);
	};
};