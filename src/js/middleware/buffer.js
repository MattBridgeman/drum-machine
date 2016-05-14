import { TOGGLE_PLAY_PAUSE, INCREMENT_SEGMENT_INDEX } from "../constants/play.state.constants";
import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../constants/audio.context.constants";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { playSound } from "../library/audio-api/context";
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

		let patternsArray = channels
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		
		//play sound
		zip([patternsArray, soundIds, sourceNodes])
			.filter(([pattern]) => !!pattern[currentSegmentIndex])
			.map(([pattern, soundId, node]) => [sounds[soundId], node])
			.forEach(([buffer, node]) => playSound(context, buffer, node.master, context.currentTime));

		return next(action);
	};
};