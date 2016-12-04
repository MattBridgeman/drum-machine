export function zip(arrays) {
	return arrays[0].map((_,i) => arrays.map(array => array[i]));
}

export function numberToArrayLength(length, offset = 0) {
	let array = [];
	for(let i = 0; i < length; i++) {
		array[i] = i + offset;
	}
	return array;
}

export function rangeToArray(min, max, step) {
	let array = [];
	let i = min;
	while(i <= max){
		array.push(i);
		i += step;
	}
	return array;
}