export function normaliseValue(value, min, max){
	if(value < min) return min;
	if(value > max) return max;
	return value;
}

export function normalisedStretchValue(value, min, max, stretchiness = 4) {
	if(value < min) {
		let diff = min - value;
		let stretch = min - (diff / stretchiness);
		return stretch;
	}
	if(value > max) {
		let diff = max - value;
		let stretch = max - (diff / stretchiness);
		return stretch;
	}
	return value;
}

export function valueAsPercentage(value, min, max){
	var range = max - min;
	var valueMinueMin = value - min;
	return (valueMinueMin / range) * 100;
}

export function percentageToValueOfRange(value, min, max){
	var range = max - min;
	return (((range / 100) * value) + min);
}