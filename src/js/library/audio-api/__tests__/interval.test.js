import td from "testdouble";
import { expect } from "chai";
import { intervalGenerator } from "../interval";

describe("Interval generator", () => {
	it("returns the promise from generator whilst 'shouldContinue' is true", () => {
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
		expect(promise).to.be.instanceOf(Promise);
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