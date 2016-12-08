import { expect } from "chai";
import { numberToArrayLength, rangeToArray, first, last } from "../array";

describe("Number to array length", function() {
	it("return an empty array if 0 passed in", function(){
    let array = numberToArrayLength(0);
    expect(array.length).to.equal(0);
  });
	it("return an array with a length of 1", function(){
    let array = numberToArrayLength(1);
    expect(array.length).to.equal(1);
  });
	it("values in array are offset by specified number", function(){
    let array = numberToArrayLength(3,1);
    expect(array).to.deep.equal([1,2,3]);
  });
});

describe("Range to array", function() {
	it("return an array if a min of 0, max of 0 and step of 0 passed in", function(){
    let min = 0;
    let max = 0;
    let step = 1;
    let array = rangeToArray(min, max, step);
    expect(array).to.deep.equal([0]);
  });
	it("return an array with length 2 if a min of 0, max of 1 and step of 1 passed in", function(){
    let min = 0;
    let max = 1;
    let step = 1;
    let array = rangeToArray(min, max, step);
    expect(array).to.deep.equal([0, 1]);
  });
});

describe("First from array", function() {
	it("returns the first item from a list", function(){
    let expectedValue = 1;
    let array = [1,2,3,4];
    let actualValue = first(array);
    expect(expectedValue).to.equal(actualValue);
  });
});

describe("Last from array", function() {
	it("returns the last item from a list", function(){
    let expectedValue = 4;
    let array = [1,2,3,4];
    let actualValue = last(array);
    expect(expectedValue).to.equal(actualValue);
  });
});