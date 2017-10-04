import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../constants/audio.context.constants";
import { NEW_BUFFER_SEGMENT } from "../constants/buffer.constants";
import rootReducer from "../reducers/root.reducer";
import { createBufferSource } from "../library/audio-api/context";
import { pitchToPlaybackRate } from "../library/audio-api/playback.rate";
import { decayPercentageToValue } from "../library/audio-api/decay";
import { zip } from "../library/natives/array";

export const triggerSounds = store => next => {

	let context;
	let sounds;
	let sourceNodes;

	let triggerSounds = (action) => {
		let prevState = store.getState();
		let state = rootReducer(prevState, action);

		let { index, time } = action;
		let { drumMachine, patterns } = state;
		let { currentBarIndex } = state.playState;

		//TODO: Make dynamic for however many drum machines there are
		let soundIds = drumMachine["0"]
			.map(channel => channel.sound);

		let pitches = drumMachine["0"]
			.map(channel => channel.pitch)
			.map(pitchToPlaybackRate);

		let decays = drumMachine["0"]
			.map(channel => channel.decay)
			.map(decayPercentageToValue);

		let patternsArray = drumMachine["0"]
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		let reverbNodes = sourceNodes
			.map(sourceNode => sourceNode.reverbNode);

		let reverbs = drumMachine["0"]
			.map(channel => channel.reverb);
		
		//create gain nodes for decay
		let decayNodes = drumMachine["0"]
			.map(channel => context.createGain());
			
		//connect decay to master
		zip([decayNodes, sourceNodes])
			.forEach(([decayNode, sourceNode]) => decayNode.connect(sourceNode.master));
		
		//apply decay to decay node
		zip([decayNodes, decays])
			.forEach(([decayNode, decay]) => decayNode.gain.linearRampToValueAtTime(0, time + decay));
		
		//play sound
		zip([patternsArray, sounds, decayNodes, reverbNodes, reverbs, pitches])
			.filter(([pattern]) => !!pattern[index])
			.forEach(([pattern, buffer, decayNode, reverbNode, reverb, pitch]) => {
				let bufferSource = createBufferSource(context, buffer);
				bufferSource.playbackRate.value = pitch || 1;
				bufferSource.connect(decayNode);
				if(reverb){
					bufferSource.connect(reverbNode.input);
				}
				bufferSource.start(time);
			});
	};

	return action => {

		switch(action.type) {
			case NEW_AUDIO_CONTEXT:
				context = action.value;
				return next(action);
			case NEW_SOUND_BUFFERS:
				sounds = action.value;
				return next(action);
			case NEW_SOURCE_NODES:
				sourceNodes = action.value;
				return next(action);
			case NEW_BUFFER_SEGMENT:
				triggerSounds(action);
				return next(action);
		}

		return next(action);
	};
};