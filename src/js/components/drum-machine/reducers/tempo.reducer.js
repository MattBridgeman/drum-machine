import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM } from '../constants/drum.machine.constants';

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
		case DECREMENT_BPM:
			return Object.assign({}, state, {
				tempo: {
					beatsPerMinute: state.tempo.beatsPerMinute - 1
				}
			});
		case CHANGE_BPM_BY_AMOUNT:
			return Object.assign({}, state, {
				tempo: {
					beatsPerMinute: state.tempo.beatsPerMinute + action.amount
				}
			});
		case CHANGE_BPM:
			return Object.assign({}, state, {
				tempo: {
					beatsPerMinute: action.value
				}
			});
		default:
			return state;
	}
}