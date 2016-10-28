export function zip(arrays) {
	return arrays[0].map((_,i) => arrays.map(array => array[i]));
}

export function numberToArrayLength(length) {
	let array = [];
	for(let i = 0; i < length; i++) {
		array[i] = i;
	}
	return array;
}