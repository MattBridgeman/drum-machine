import { percentageToValueOfRange } from "../natives/numbers";

export const MIN_PAN = -1;
export const MAX_PAN = 1;

export function panPercentageToValue(panPercentage) {
	let x = percentageToValueOfRange(panPercentage, MIN_PAN, MAX_PAN),
		y = 0,
        z = 1 - Math.abs(x);
	return [x, y, z];
}