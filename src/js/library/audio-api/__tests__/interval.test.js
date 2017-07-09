import Rx from "rxjs/Rx";
import td from "testdouble";
import { expect } from "chai";
import { createIntervalStream, intervalGenerator, intervalStream } from "../interval";

describe("Interval", () => {
	
	it("calls adds to the segment stream if current time is greater than interval time", () => {
		let startTime = 0;
		let currentTime = 126;
		let intervalTime = 125;
		let subject = new Rx.Subject();
		
		let segmentStream = createIntervalStream(
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
		
		subject.next(1);
	});
});

describe("Interval generator", () => {
	it("calls callback asynchronously from generator whilst 'shouldContinue' is true", () => {
		let i = -1;
		let shouldContinue = () => {
			i++;
			if(i < 1) return true;
			else return false;
		};
		let timeout = () => Promise.resolve(true);
		let callback = td.function();
		let stream = intervalGenerator(shouldContinue, timeout, callback);
		let promise = stream.next().value;
		return promise.then(() => {
			td.verify(callback(true));
		});
	});
	it("finishes the generator when 'shouldContinue' is false", () => {
		let i = -1;
		let shouldContinue = () => {
			i++;
			if(i < 1) return true;
			else return false;
		};
		let timeout = () => Promise.resolve(true);
		let callback = td.function();
		let stream = intervalGenerator(shouldContinue, timeout, callback);
		stream.next();
		let final = stream.next();
		expect(final.done).to.be.true;
	});
});

describe("Interval stream", () => {
	it("returns a function to create a stream given arguments", () => {
		let shouldContinue = td.function();
		let timeout = td.function();
		let callback = td.function();
		let createStream = intervalStream(shouldContinue, timeout, callback);
		expect(createStream).to.be.a.function;
	});
});