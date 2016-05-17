import { percentageToValueOfRange } from "../natives/numbers";

const MIN_DECAY = 0.03;
const MAX_DECAY = 1;

export function decayPercentageToValue(decayPercentage) {
	return percentageToValueOfRange(decayPercentage, MIN_DECAY, MAX_DECAY);
}