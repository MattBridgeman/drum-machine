import { PLAY, PAUSE, TOGGLE_PLAY_PAUSE, TOGGLE_BEAT_STATE } from '../constants/drum.machine.constants';

const initialState = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	}
};

export default function tempo(state = initialState, action) {
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

        case TOGGLE_PLAY_PAUSE:
		//TODO: use immutable library
		return Object.assign({}, state, { isPlaying: !state.isPlaying });
		
		TOGGLE_BEAT_STATE:
		//TODO: use immutable library
		return Object.assign({}, state, {
			beats: {
				[action.id]: state.beats[action.id] ? 0 : 1
			}
		});

		default:
		return state;
	}
}