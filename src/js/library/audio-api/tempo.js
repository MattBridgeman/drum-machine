import { percentageToValueOfRange } from "../natives/numbers";

const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const MIN_PERCENTAGE_OF_SEGMENT_TO_SWING = 0;
const MAX_PERCENTAGE_OF_SEGMENT_TO_SWING = 25;

export function getBeatsPerSecond(beatsPerMinute) {
	return beatsPerMinute / SECONDS_IN_MINUTE;
}

export function getBeatTimeInSeconds(beatsPerMinute){
	return 1 / getBeatsPerSecond(beatsPerMinute);
}

export function getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat){
	return getBeatTimeInSeconds(beatsPerMinute) / segmentsPerBeat;
}

function isEven(int){
	return int % 2 === 0;
}

export function getSwingOffset(currentSegmentIndex, swing, segmentTime){
	let even = isEven(currentSegmentIndex);
	let swingPercentage = percentageToValueOfRange(swing, MIN_PERCENTAGE_OF_SEGMENT_TO_SWING, MAX_PERCENTAGE_OF_SEGMENT_TO_SWING);
	let swingValue = segmentTime / 100 * swingPercentage;
	if(even) {
		return -swingValue;
	} else {
		return swingValue;
	}
}

export function getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat, currentSegmentIndex, swing){
	let segmentTime = getSegmentTimeInSeconds(beatsPerMinute, segmentsPerBeat) * 1000;
	let swingOffset = getSwingOffset(currentSegmentIndex, swing, segmentTime);
	return segmentTime + swingOffset;
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
	segmentInterval,
	segmentsToBuffer
}, currentTime) {
	let i = 0;
	let segmentLimit = currentSegmentIndex + segmentsToBuffer;
	let segments = [];
	while(i <= segmentLimit){
		segments.push(i);
		i++;
	}
	return segments;
}

