import { expect } from "chai";
import { getCurrentSegmentIndex } from "../tempo.js";
import { getSegmentsToBuffer } from "../tempo";

describe("Tempo", () => {
	
	it("determines the current segment index given a 'previous tempo change' object and a current time", () => {
		
		const segmentIndexAfterOneBeat = getCurrentSegmentIndex({
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4,
			time: 0,
			segmentIndex: 0
		}, 0.5);
		
		expect(segmentIndexAfterOneBeat).to.equal(4);
		
		const segmentIndexAfterTwoBeats = getCurrentSegmentIndex({
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4,
			time: 0,
			segmentIndex: 0
		}, 1);
		
		expect(segmentIndexAfterTwoBeats).to.equal(8);
		
		const segmentIndexAfterNoTime = getCurrentSegmentIndex({
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4,
			time: 0,
			segmentIndex: 0
		}, 0);
		
		expect(segmentIndexAfterNoTime).to.equal(0);
	});
	
	it("returns a list of segment objects to buffer given a current segment time and index", () => {
		
		const currentSegment = {
			currentSegmentTime: 0,
			currentSegmentIndex: 0
		};
		
		const bpmInfo = {
			segmentInterval: 125,
			segmentsToBuffer: 2
		}
		
		const currentTime = 0;
		
		const segmentsFromZero = getSegmentsToBuffer(currentSegment, bpmInfo, currentTime);
		
		expect(segmentsFromZero).to.deep.equal([
		{
			index: 0,
			time: 0
		},
		{
			index: 1,
			time: 125	
		},
		{
			index: 2,
			time: 250
		}]);
	});

});