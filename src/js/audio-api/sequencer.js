export function getSegmentsToBuffer({
	segmentOffset,
	segmentsToBuffer
}) {
	let i = segmentOffset;
	let segmentLimit = segmentOffset + segmentsToBuffer;
	let segments = [];
	while(i <= segmentLimit){
		segments.push(i);
		i++;
	}
	return segments;
}