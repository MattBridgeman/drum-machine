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
	
	it("returns a list of segment indexes to buffer given a segment offset", () => {
		
		const segmentsFromZero = getSegmentsToBuffer({
			segmentOffset: 0,
			segmentsToBuffer: 2
		});
		
		expect(segmentsFromZero).to.deep.equal([0, 1, 2]);
		
		const segmentsFromOne = getSegmentsToBuffer({
			segmentOffset: 1,
			segmentsToBuffer: 2
		});
		
		expect(segmentsFromOne).to.deep.equal([1, 2, 3]);
	});

});