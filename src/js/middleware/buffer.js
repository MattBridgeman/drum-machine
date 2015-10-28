import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { loadSounds } from "../library/audio-api/buffer";
import { WebAudioContext } from "../library/audio-api/context";
import { zip } from "../library/natives/array";

export const createBuffer = store => {
	// creation of context
	let context = new WebAudioContext();
	
	//loading of sounds
	let buffers = loadSounds(store);
	let soundPromises = Promise.all(buffers)
		.then((promises) => context.decodeAudioDataArray(promises));
	let sounds = [];

	soundPromises.then(soundBuffers => soundBuffers.map(soundBuffer => sounds.push(soundBuffer)));

	return next => action => {
		let state = store.getState();
		
		if (!(action.type === TOGGLE_PLAY_PAUSE && state.playState.isPlaying === false) && action.type !== INCREMENT_SEGMENT_INDEX) {
			return next(action);
		}
		
		//playing of sounds
		let { channels, patterns } = state;
		let { currentSegmentIndex, currentBarIndex } = state.playState;
		let channelKeys = Object.keys(channels);
		let channelsArray = channelKeys
			.map((key) => channels[key]);

		let soundIds = channelsArray
			.map(channel => channel.sound);

		let patternsArray = channelsArray
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);

		zip([patternsArray, soundIds])
			.filter(([pattern]) => !!pattern[currentSegmentIndex])
			.map(([pattern, soundId]) => sounds[soundId])
			.forEach(buffer => context.playSound(buffer, context.getCurrentTime()));

		return next(action);
	};
};