import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE } from "../constants/tempo.constants";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../constants/track.constants";
import { normaliseValue } from "../library/natives/numbers.js";

const initialState = {
	beatsPerMinute: 120,
	beatsPerBar: 4,
	segmentsPerBeat: 4
};

export default function tempo(state = initialState, action) {
	switch (action.type) {
		case INCREMENT_BPM:
			let incrementBPM = state.beatsPerMinute + 1;
			let normalisedIncrementBPM = normaliseValue(incrementBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: Math.round(normalisedIncrementBPM)
			});
		case DECREMENT_BPM:
			let decrementBPM = state.beatsPerMinute - 1;
			let normalisedDecrementBPM = normaliseValue(decrementBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: Math.round(normalisedDecrementBPM)
			});
		case CHANGE_BPM_BY_AMOUNT:
			let changeByBPM = state.beatsPerMinute + action.amount;
			let normalisedChangeByBPM = normaliseValue(changeByBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: Math.round(normalisedChangeByBPM)
			});
		case CHANGE_BPM:
			let changeBPM = action.value;
			let normalisedChangeBPM = normaliseValue(changeBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: Math.round(normalisedChangeBPM)
			});
		case NEW_TRACK_LOADING:
			return initialState;
		case LOAD_DEFAULT_TRACK:
			return initialState;
		case NEW_TRACK_LOADED:
			return action.tempo;
		default:
			return state;
	}
}