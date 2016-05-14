import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS } from "../constants/audio.context.constants";

export function newAudioContext(context) {
	return {
		type: NEW_AUDIO_CONTEXT,
		value: context
	};
}

export function newSoundBuffers(soundBuffers) {
	return {
		type: NEW_SOUND_BUFFERS,
		value: soundBuffers
	};
}