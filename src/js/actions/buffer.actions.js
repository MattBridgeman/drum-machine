import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS, CLEAR_BUFFER_SEGMENT } from "../constants/buffer.constants";

export function newBufferSegment(index, time, duration) {
	return {
		type: NEW_BUFFER_SEGMENT,
		index,
		time,
		duration
	};
}

export function clearBufferSegments() {
	return {
		type: CLEAR_BUFFER_SEGMENTS
	};
}

export function clearBufferSegment(id) {
	return {
		type: CLEAR_BUFFER_SEGMENT,
		id
	};
}