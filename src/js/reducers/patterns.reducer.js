import { ADD_PATTERN, TOGGLE_BEAT_STATE } from "../constants/patterns.constants";
import { numberToArrayLength } from "../library/natives/array";

const NUMBER_OF_CHANNELS = 9;
const NUMBER_OF_BANKS = 8;

export function getPatternBanksArray(numberOfBanks = NUMBER_OF_BANKS){
	return numberToArrayLength(numberOfBanks);
}

export function getInitialPattern(){
	return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function getInitialState(numberOfPatterns = NUMBER_OF_CHANNELS){
	let patterns = {};
	for(let i = 0; i < numberOfPatterns; i++) {
		patterns[i] = getInitialPattern();
	}
	return patterns;
}

const numberOfPatterns = NUMBER_OF_CHANNELS * NUMBER_OF_BANKS;
const initialState = getInitialState(numberOfPatterns);

export default function patterns(state = initialState, action) {
	switch (action.type) {
		case ADD_PATTERN:
			let id = Object.keys(state).length;
			return Object.assign({}, state, { [id]: action.value });
		case TOGGLE_BEAT_STATE:
			let { patternId, index, value } = action.value;
			let pattern = state[patternId];
			let newPattern = pattern.map((beat, i) => i === index ? value : beat);
			return Object.assign({}, state, { [patternId]: newPattern });
		default:
			return state;
	}
}