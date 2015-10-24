const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

export function getBeatsPerSecond(beatsPerMinute) {
	return beatsPerMinute / SECONDS_IN_MINUTE;
}

export function getBeatTimeInSeconds(beatsPerMinute){
	return 1 / getBeatsPerSecond(beatsPerMinute);
}

export function getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat){
	return getBeatTimeInSeconds(beatsPerMinute) / segmentsPerBeat;
}

export function getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat){
	return getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat) * 1000;
}

export function getSegmentsInTimespan(timespan, segmentTime){
	return Math.floor(timespan / segmentTime);
}

export function getCurrentSegmentIndex({
	beatsPerMinute,
	beatsPerBar,
	segmentsPerBeat,
	time,
	segmentIndex
}, currentTime){
	var timespan = currentTime - time;
	var segmentTime = getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat);
	var elapsedSegments = getSegmentsInTimespan(timespan, segmentTime);
	return segmentIndex + elapsedSegments;
}

export function getSegmentsToBuffer({
	currentSegmentTime,
	currentSegmentIndex
}, {
	beatsPerMinute,
	beatsPerBar,
	segmentsPerBeat,
	segmentsToBuffer
}, currentTime) {
	let i = 0;
	let segmentLimit = currentSegmentIndex + segmentsToBuffer;
	let segments = [];
	while(i <= segmentLimit){
		segments.push({
			segmentTime: 1000,
			segmentIndex: i
		});
		i++;
	}
	return segments;
}

