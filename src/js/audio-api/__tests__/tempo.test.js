import { expect } from "chai";
import { getCurrentSegmentIndex } from "../tempo.js";

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

});