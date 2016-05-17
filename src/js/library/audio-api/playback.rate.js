import { percentageToValueOfRange } from "../natives/numbers";

const MIN_PLAYBACK_RATE = 0.4;
const MAX_PLAYBACK_RATE = 1.6;

export function pitchToPlaybackRate(pitch) {
	return percentageToValueOfRange(pitch, MIN_PLAYBACK_RATE, MAX_PLAYBACK_RATE);
}