import { expect } from "chai";
import { numberToArrayLength, rangeToArray, first, last, objectToArray, objectToArrayWithKeyValue } from "../array";

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

describe("Object to array", function() {
	it("returns an empty array if given an empty object", function(){
    let expectedValue = [];
    let object = {};
    let actualValue = objectToArray(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
	it("returns an array with one item if given an object with one item is given", function(){
    let expectedValue = ["one"];
    let object = { 0: "one" };
    let actualValue = objectToArray(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
	it("returns an array with two items if given an object with two items is given", function(){
    let expectedValue = ["one", "two"];
    let object = { 0: "one", 1: "two" };
    let actualValue = objectToArray(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
});

describe("Object to array with key, value", function() {
	it("returns an empty array if given an empty object", function(){
    let expectedValue = [];
    let object = {};
    let actualValue = objectToArrayWithKeyValue(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
	it("returns an array with one item if given an object with one item is given", function(){
    let expectedValue = [{key: "0", value: "one"}];
    let object = { 0: "one" };
    let actualValue = objectToArrayWithKeyValue(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
	it("returns an array with two items if given an object with two items is given", function(){
    let expectedValue = [{key: "0", value: "one"}, {key: "1", value: "two"}];
    let object = { 0: "one", 1: "two" };
    let actualValue = objectToArrayWithKeyValue(object);
    expect(expectedValue).to.deep.equal(actualValue);
  });
});