import { expect } from "chai";
import { createIntervalStream } from "../interval";
import * as Rx from "Rx";

describe("Interval", () => {
	
	it("calls adds to the segment stream if current time is greater than interval time", () => {
		let startTime = 0;
		let currentTime = 126;
		let intervalTime = 125;
		let subject = new Rx.Subject();
		
		let segmentStream = createIntervalStream(
			startTime,
			() => currentTime,
			() => intervalTime,
			(callback) => subject.take(1).subscribe(callback)
		);
		
		segmentStream
			.take(1)
			.toArray()
			.subscribe(value => {
				expect(value.length).to.equal(1);
			});
		
		subject.onNext(1);
	});
});