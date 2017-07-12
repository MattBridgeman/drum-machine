import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../constants/audio.context.constants";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { createBufferSource } from "../library/audio-api/context";
import { pitchToPlaybackRate } from "../library/audio-api/playback.rate";
import { decayPercentageToValue } from "../library/audio-api/decay";
import { zip } from "../library/natives/array";

export const triggerSounds = store => {

	return next => {

		let context;
		let sounds;
		let sourceNodes;

		let triggerSounds = (action) => {
			let prevState = store.getState();
			let state = rootReducer(prevState, action);
			//playing of sounds
			let bufferTime = action.value || context.currentTime;
			let { channels, patterns } = state;
			let { currentSegmentIndex, currentBarIndex } = state.playState;

			let soundIds = channels
				.map(channel => channel.sound);

			let pitches = channels
				.map(channel => channel.pitch)
				.map(pitchToPlaybackRate);

			let decays = channels
				.map(channel => channel.decay)
				.map(decayPercentageToValue);

			let patternsArray = channels
				.map(channel => channel.patterns[currentBarIndex])
				.map(patternId => patterns[patternId]);
			
			let reverbNodes = sourceNodes
				.map(sourceNode => sourceNode.reverbNode);

			let reverbs = channels
				.map(channel => channel.reverb);
			
			//create gain nodes for decay
			let decayNodes = channels
				.map(channel => context.createGain());
				
			//connect decay to master
			zip([decayNodes, sourceNodes])
				.forEach(([decayNode, sourceNode]) => decayNode.connect(sourceNode.master));
			
			//apply decay to decay node
			zip([decayNodes, decays])
				.forEach(([decayNode, decay]) => decayNode.gain.linearRampToValueAtTime(0, bufferTime + decay));
			
			//play sound
			zip([patternsArray, sounds, decayNodes, reverbNodes, reverbs, pitches])
				.filter(([pattern]) => !!pattern[currentSegmentIndex])
				.forEach(([pattern, buffer, decayNode, reverbNode, reverb, pitch]) => {
					let bufferSource = createBufferSource(context, buffer);
					bufferSource.playbackRate.value = pitch || 1;
					bufferSource.connect(decayNode);
					if(reverb){
						bufferSource.connect(reverbNode.input);
					}
					bufferSource.start(bufferTime);
				});
		};

		return action => {
			let prevState = store.getState();
			
			if(action.type === NEW_AUDIO_CONTEXT){
				context = action.value;
				return next(action);
			}
			
			if(action.type === NEW_SOUND_BUFFERS){
				sounds = action.value;
				return next(action);
			}
			
			if(action.type === NEW_SOURCE_NODES){
				sourceNodes = action.value;
				return next(action);
			}
			
			if (!(action.type === TOGGLE_PLAY_PAUSE && prevState.playState.isPlaying === false) && action.type !== INCREMENT_SEGMENT_INDEX) {
				return next(action);
			}
			
			triggerSounds(action);

			return next(action);
		};
	};
};