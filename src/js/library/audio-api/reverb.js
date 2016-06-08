import { percentageToValueOfRange } from "../natives/numbers";

const MIN_REVERB_SECONDS = 0.2;
const MAX_REVERB_SECONDS = 2;
const MIN_REVERB_DECAY = 0.2;
const MAX_REVERB_DECAY = 2;

export function reverbSecondsPercentageToValue(reverbPercentage) {
	return percentageToValueOfRange(reverbPercentage, MIN_REVERB_SECONDS, MAX_REVERB_SECONDS);
}

export function reverbDecayPercentageToValue(reverbPercentage) {
	return percentageToValueOfRange(reverbPercentage, MIN_REVERB_DECAY, MAX_REVERB_DECAY);
}