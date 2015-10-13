import { expect } from "chai";
import { getSegmentsToBuffer } from "../sequencer";

describe("Sequencer", () => {

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