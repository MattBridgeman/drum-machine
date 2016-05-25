import { expect } from "chai";
import { lengthOfLine } from "../line";

describe("Line", function() {

	it("Expect length of line to be 5 give points 1,1 and 4,5", function(){
		let pointa = { x: 1, y: 1 };
		let pointb = { x: 4, y: 5 };
		let length = lengthOfLine(pointa, pointb);
		expect(length).to.equal(5);
	});
});