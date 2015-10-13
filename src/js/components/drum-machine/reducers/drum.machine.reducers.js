import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, TOGGLE_BEAT_STATE } from "../constants/drum.machine.constants";

const initialState = {
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
			transformers: [0]
		},
		1: {
			sound: 1,
			patterns: [1],
			transformers: [1]
		}
	},
	transformer: {
		0: {
			name: "volume",
			value: 50
		},
		1: {
			name: "volume",
			value: 50
		}
	},
	patterns: {
		0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		1: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
	},
	beats: {
		0: 1,
		1: 0,
		2: 0,
		3: 0,
		4: 1,
		5: 0,
		6: 0,
		7: 0,
		8: 1,
		9: 0,
		10: 0,
		11: 0,
		12: 1,
		13: 0,
		14: 0,
		15: 0,
		16: 0,
		17: 0,
		18: 0,
		19: 1,
		20: 0,
		21: 0,
		22: 0,
		23: 0,
		24: 0,
		25: 0,
		26: 0,
		27: 1,
		28: 0,
		29: 0,
		30: 0,
		31: 0
	},
	isPlaying: false
};

export default function drumMachine(state = initialState, action) {
	switch (action.type) {
		// case PLAY:
		// //TODO: use immutable library
		// return Object.assign({}, state, { isPlaying: true });

        // case PAUSE:
		// //TODO: use immutable library
		// return Object.assign({}, state, { isPlaying: false });

        // case TOGGLE_PLAY_PAUSE:
		// //TODO: use immutable library
		// return Object.assign({}, state, { isPlaying: !state.isPlaying });

        // case TOGGLE_PLAY_PAUSE:
		// //TODO: use immutable library
		// return Object.assign({}, state, { isPlaying: !state.isPlaying });

		// TOGGLE_BEAT_STATE:
		// //TODO: use immutable library
		// return Object.assign({}, state, {
		// 	beats: {
		// 		[action.id]: state.beats[action.id] ? 0 : 1
		// 	}
		// });

		default:
		return state;
	}
}