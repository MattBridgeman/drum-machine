import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";

export function newAudioContext(context) {
	return {
		type: NEW_AUDIO_CONTEXT,
		value: context
	};
}