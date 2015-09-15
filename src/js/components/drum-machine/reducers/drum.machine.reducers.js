import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE } from '../constants/drum.machine.constants';

const initialState = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	},
	sounds: {
		0: {
			name: "kick",
			path: "samples/808/01_KCK1.WAV"
		},
		1: {
			name: "clap",
			path: "samples/808/15_CLP2.WAV"
		}
	},
	channels: {
		0: {
			sound: 0,
			patterns: [0],
			effects: [0]
		},
		1: {
			sound: 1,
			patterns: [1],
			effects: [1]
		}
	},
	effect: {
		0: {
			type: "volume",
			value: 50
		},
		1: {
			type: "volume",
			value: 50
		}
	},
	patterns: {
		0: [0, 4, 8, 12, 14],
		1: [4, 12, 13, 15]
	},
	isPlaying: false
};

export default function drumMachine(state = initialState, action) {
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