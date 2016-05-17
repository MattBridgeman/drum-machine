import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../constants/audio.context.constants";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { playSound } from "../library/audio-api/context";
import { pitchToPlaybackRate } from "../library/audio-api/playback.rate";
import { zip } from "../library/natives/array";

export const createBuffer = store => {

	let context;
	let sounds;
	let sourceNodes;

	return next => action => {
		let prevState = store.getState();
		let state = rootReducer(prevState, action);
		
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
		
		//playing of sounds
		let { channels, patterns } = state;
		let { currentSegmentIndex, currentBarIndex } = state.playState;

		let soundIds = channels
			.map(channel => channel.sound);

		let pitches = channels
			.map(channel => channel.pitch)
			.map(pitchToPlaybackRate);

		let patternsArray = channels
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		let decayNodes = channels
			.map(channel => context.createGain());
		
		//create gain nodes for decay
		zip([decayNodes, sourceNodes])
			.forEach(([decayNode, sourceNode]) => decayNode.connect(sourceNode.master))
		
		//apply decay to decay node
		decayNodes
			.forEach(decayNode => decayNode.gain.linearRampToValueAtTime(0, context.currentTime + 0.03));
		
		//play sound
		zip([patternsArray, soundIds, decayNodes, pitches])
			.filter(([pattern]) => !!pattern[currentSegmentIndex])
			.map(([pattern, soundId, node, pitch]) => [sounds[soundId], node, pitch])
			.forEach(([buffer, node, pitch]) => playSound(context, buffer, node, context.currentTime, pitch));

		return next(action);
	};
};