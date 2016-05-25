import { expect } from "chai";
import { angleInRightTriangleInDegrees, radiansToDegrees } from "../triangle";

describe("Triangle", function() {

	it("Expect angle in right triangle to be 44 deg", function(){
		let adjacent = 5;
		let hypotenuse = 7;
		let angle = angleInRightTriangleInDegrees(adjacent, hypotenuse);
		expect(angle).to.be.within(44.4, 44.5);
	});

	it("Expect 0 radians to equal 0 degrees", function(){
		expect(radiansToDegrees(0)).to.equal(0);
	});

	it("Expect π radians to equal 180 degrees", function(){
		expect(radiansToDegrees(Math.PI)).to.equal(180);
	})

	it("Expect 2π radians to equal 360 degrees", function(){
		expect(radiansToDegrees(2 * Math.PI)).to.equal(360);
	})
});