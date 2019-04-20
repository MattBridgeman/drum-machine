import { normaliseValue } from "../natives/numbers";

export const MIN_FILTER = 0;
export const MAX_FILTER = 20000;

export const filterPercentageToValue = (percentage) => {
  return normaliseValue(percentage * 2 * percentage, MIN_FILTER, MAX_FILTER);
};