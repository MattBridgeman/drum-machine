import { INCREMENT_BPM, DECREMENT_BPM } from '../constants/drum.machine.constants';

const initialState = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	}
};

export default function tempo(state = initialState, action) {
	switch (action.type) {
		case INCREMENT_BPM:
			return Object.assign({}, state, {
				tempo: {
					beatsPerMinute: state.tempo.beatsPerMinute + 1
				}
			});
		default:
			return state;
	}
}