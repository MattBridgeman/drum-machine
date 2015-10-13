const secondsInMinute = 60;

export function getBeatsPerSecond(beatsPerMinute) {
	return beatsPerMinute / secondsInMinute;
}

export function getBeatTimeInSeconds(beatsPerMinute){
	return 1 / getBeatsPerSecond(beatsPerMinute);
}

export function getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat){
	return getBeatTimeInSeconds(beatsPerMinute) / segmentsPerBeat;
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