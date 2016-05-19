import { percentageToValueOfRange } from "../natives/numbers";

export const MIN_PAN = -1;
export const MAX_PAN = 1;

export function panPercentageToValue(panPercentage) {
	return percentageToValueOfRange(panPercentage, MIN_PAN, MAX_PAN);
}