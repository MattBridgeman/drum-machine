import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { incrementSegmentIndex } from "../actions/play.state.actions";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { loadSounds } from "../library/audio-api/buffer";
import { createAudioContext, playSound, decodeAudioDataArray } from "../library/audio-api/context";
import { zip } from "../library/natives/array";

export const loadSounds = store => {
	// creation of context
	let context = createAudioContext();
	
	//loading of sounds
	let buffers = loadSounds(store);
	let soundPromises = Promise.all(buffers)
		.then((promises) => decodeAudioDataArray(context, promises));
	let sounds = [];

	soundPromises.then(soundBuffers => soundBuffers.map(soundBuffer => sounds.push(soundBuffer)));

	return next => action => {
		let prevState = store.getState();
		let state = rootReducer(prevState, action);
		
		if (!(action.type === TOGGLE_PLAY_PAUSE && prevState.playState.isPlaying === false) && action.type !== INCREMENT_SEGMENT_INDEX) {
			return next(action);
		}
		
		//playing of sounds
		let { channels, patterns, transformers } = state;
		let { currentSegmentIndex, currentBarIndex } = state.playState;

		let soundIds = channels
			.map(channel => channel.sound);

		let patternsArray = channels
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		let transformersIds = channels
			.map(channel => channel.transformers);
		
		let transformersArray = transformersIds
			.map(transformerIds => transformers[transformerIds[0]]);
		
		let transformerNodes = transformersArray
			.map(transformer => context.createGain());
		
		//set volume and
		//connect gain to context
		zip([transformersArray, transformerNodes])
			.forEach(([transformer, node]) => {
				node.gain.value = transformer.value * 0.01;
				node.connect(context.destination);
			});
		
		//play sound
		zip([patternsArray, soundIds, transformerNodes])
			.filter(([pattern]) => !!pattern[currentSegmentIndex])
			.map(([pattern, soundId, node]) => [sounds[soundId], node])
			.forEach(([buffer, node]) => playSound(context, buffer, node, context.currentTime));

		return next(action);
	};
};