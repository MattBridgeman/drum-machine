import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../constants/audio.context.constants";

export function newAudioContext(context) {
	console.log("new audio context");
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

export function newSourceNodes(sourceNodes) {
	return {
		type: NEW_SOURCE_NODES,
		value: sourceNodes
	};
}