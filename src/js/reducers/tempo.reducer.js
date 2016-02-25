import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE } from "../constants/tempo.constants";
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
				beatsPerMinute: normalisedIncrementBPM
			});
		case DECREMENT_BPM:
			let decrementBPM = state.beatsPerMinute - 1;
			let normalisedDecrementBPM = normaliseValue(decrementBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: normalisedDecrementBPM
			});
		case CHANGE_BPM_BY_AMOUNT:
			let changeByBPM = state.beatsPerMinute + action.amount;
			let normalisedChangeByBPM = normaliseValue(changeByBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: normalisedChangeByBPM
			});
		case CHANGE_BPM:
			let changeBPM = action.value;
			let normalisedChangeBPM = normaliseValue(changeBPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE);
			return Object.assign({}, state, {
				beatsPerMinute: normalisedChangeBPM
			});
		default:
			return state;
	}
}