import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from '../constants/drum.machine.constants';

const initialState = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	},
	selectedSoundIndex: 0,
	sounds: [{
		name: "kick",
		path: "samples/808/01_KCK1.WAV"
	}, {
		name: "clap",
		path: "samples/808/15_CLP2.WAV"
	}],
	patterns: [{
		name: "kick",
		patterns: [
			[0, 4, 8, 12, 14]
		]
	}, {
		name: "kick",
		patterns: [
			[4, 12, 13, 15]
		]
	}],
	isPlaying: false
};

export default function playPauseReducers(state = initialState, action) {
	switch (action.type) {
		case PLAY:
		//TODO: use immutable library
		return Object.assign({}, state, { isPlaying: true });

        case PAUSE:
		//TODO: use immutable library
		return Object.assign({}, state, { isPlaying: false });

        case TOGGLE_PLAY_PAUSE:
		//TODO: use immutable library
		return Object.assign({}, state, { isPlaying: !state.isPlaying });

		default:
		return state;
	}
}