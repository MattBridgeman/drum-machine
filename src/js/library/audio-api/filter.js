export const MIN_FILTER = 20;
export const MAX_FILTER = 20000;

export const filterPercentageToValue = (percentage) => {
  return percentage * 2 * percentage;
};