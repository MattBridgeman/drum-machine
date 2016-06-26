import { expect } from "chai";
import { MIN_PAN, MAX_PAN, panPercentageToValue } from "../pan";

describe("Pan", () => {
	it("goes to min pan given a percentage of '0'", () => {
		const pan = panPercentageToValue(0);
		
		expect(pan).to.deep.equal([-1, 0, 0]);
	});
	it("goes to max pan given a percentage of '100'", () => {
		const pan = panPercentageToValue(100);
		
		expect(pan).to.deep.equal([1, 0, 0]);
	});
	it("goes half way between min and max pan given a percentage of '50'", () => {
		const pan = panPercentageToValue(50);
		
		expect(pan).to.deep.equal([0, 0, 1]);
	});
});
		