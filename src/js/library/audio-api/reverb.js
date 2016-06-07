import { percentageToValueOfRange } from "../natives/numbers";

const MIN_REVERB_SECONDS = 0.2;
const MAX_REVERB_SECONDS = 2;

export function reverbPercentageToValue(reverbPercentage) {
	return percentageToValueOfRange(reverbPercentage, MIN_REVERB_SECONDS, MAX_REVERB_SECONDS);
}