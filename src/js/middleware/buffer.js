import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { loadSounds } from "../library/audio-api/buffer";
import { createAudioContext, playSound, decodeAudioDataArray } from "../library/audio-api/context";
import { zip } from "../library/natives/array";

export const createBuffer = store => {
	// creation of context
	let context = createAudioContext();
	
	//loading of sounds
	let buffers = loadSounds(store);
	let soundPromises = Promise.all(buffers)
		.then((promises) => decodeAudioDataArray(context, promises));
	let sounds = [];

	soundPromises.then(soundBuffers => soundBuffers.map(soundBuffer => sounds.push(soundBuffer)));

	return next => action => {
		let state = store.getState();
		
		if (!(action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false) && action.type !== INCREMENT_SEGMENT_INDEX) {
			return next(action);
		}
		
		//playing of sounds
		let { channels, patterns, transformers } = state;
		let { currentSegmentIndex, currentBarIndex } = state.playState;
		let channelKeys = Object.keys(channels);
		let channelsArray = channelKeys
			.map((key) => channels[key]);

		let soundIds = channelsArray
			.map(channel => channel.sound);

		let patternsArray = channelsArray
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		let transformersIds = channelsArray
			.map(channel => channel.transformers);
		
		let transformersArray = transformersIds
			.map(transformerIds => transformerIds.map(id => transformers.id));
		
		let transformerNodes = transformersArray
			.map(transformer => context.createGain());
		
		transformerNodes.forEach(node => node.gain.value);
		
		zip([patternsArray, soundIds, transformerNodes])
			.filter(([pattern]) => !!pattern[currentSegmentIndex])
			.map(([pattern, soundId, nodes]) => [sounds[soundId], nodes])
			.forEach(buffer => playSound(context, buffer, context.destination, context.currentTime));

		return next(action);
	};
};