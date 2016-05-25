import { expect } from "chai";
import { angleInRightTriangleInDegrees, radiansToDegrees, angleFromHorizontalGivenXandY } from "../triangle";

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
	});

	it("Expect 2π radians to equal 360 degrees", function(){
		expect(radiansToDegrees(2 * Math.PI)).to.equal(360);
	});
	
	it("Expect 20 degrees given a negative x and positive y", function(){
		expect(angleFromHorizontalGivenXandY(20, { x: -1, y: 1 })).to.equal(20);
	});
	
	it("Expect 70 degrees given a negative x and positive y", function(){
		expect(angleFromHorizontalGivenXandY(70, { x: -1, y: 1 })).to.equal(70);
	});
	
	it("Expect 110 degrees given 70, a positive x and positive y", function(){
		expect(angleFromHorizontalGivenXandY(70, { x: 1, y: 1 })).to.equal(110);
	});
	
	it("Expect 160 degrees given 20, a positive x and positive y", function(){
		expect(angleFromHorizontalGivenXandY(20, { x: 1, y: 1 })).to.equal(160);
	});
	
	it("Expect 200 degrees given 20, a positive x and negative y", function(){
		expect(angleFromHorizontalGivenXandY(20, { x: 1, y: -1 })).to.equal(200);
	});
	
	it("Expect 250 degrees given 70, a positive x and negative y", function(){
		expect(angleFromHorizontalGivenXandY(70, { x: 1, y: -1 })).to.equal(250);
	});
	
	it("Expect 290 degrees given 70, a negative x and negative y", function(){
		expect(angleFromHorizontalGivenXandY(70, { x: -1, y: -1 })).to.equal(290);
	});
	
	it("Expect 340 degrees given 20, a negative x and negative y", function(){
		expect(angleFromHorizontalGivenXandY(20, { x: -1, y: -1 })).to.equal(340);
	});
});