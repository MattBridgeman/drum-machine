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

export function numberToArrayLengthWithValue(length, value) {
	let array = [];
	for(let i = 0; i < length; i++) {
		array[i] = value;
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

export function first([head, ...tail]) {
	return head;
}

export function last(array) {
	let last = array[array.length-1];
	return last;
}

export function objectToArray(object) {
	let keys = Object.keys(object);
	return keys.map(key => object[key]);
}

export function objectToArrayWithKeyValue(object) {
	let keys = Object.keys(object);
	return keys.map(key => ({
		key: key,
		value: object[key]
	}));
}

export function keyValueArrayToObject(objectList) {
	let object = {};
	objectList.forEach(({
		key,
		value
	}) => {
		object[key] = value;
	});
	return object;
}