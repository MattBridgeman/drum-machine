import { expect } from "chai";
import { normaliseValue, isBeyondNormalisedValue, valueAsPercentageOfX, percentageToValueOfRange } from "../numbers";

describe("percentageToValueOfRange", function() {
  it("returns 0 given min of 0, max of 1 and value 0", function(){
    let expectedValue = 0;
    let actualValue = percentageToValueOfRange(0, 0, 1);
    expect(actualValue).to.equal(expectedValue);
  });
  it("returns 1 given min of 0, max of 1 and value 100", function(){
    let expectedValue = 1;
    let actualValue = percentageToValueOfRange(100, 0, 1);
    expect(actualValue).to.equal(expectedValue);
  });
  it("returns 2 given min of 0.2, max of 2, value 100", function(){
    let expectedValue = 2;
    let actualValue = percentageToValueOfRange(100, 0.2, 2);
    expect(actualValue).to.equal(expectedValue);
  });
  it("returns 1.1 given min of 0.2, max of 2, value 50", function(){
    let expectedValue = 1.1;
    let actualValue = percentageToValueOfRange(50, 0.2, 2);
    expect(actualValue).to.equal(expectedValue);
  });
  it("returns 0.794 given min of 0.2, max of 2, value 33", function(){
    let expectedValue = 0.794;
    let actualValue = percentageToValueOfRange(33, 0.2, 2);
    expect(actualValue).to.equal(expectedValue);
  });
});

describe("Is beyond normalised value", function() {
  it("returns false is value is within normalised", function(){
    let expectedValue = 50;
    let actualValue = isBeyondNormalisedValue(expectedValue, 0, 100);
    expect(actualValue).to.equal(false);
  });

  it("returns true is value is less than normalised", function(){
    let expectedValue = -1;
    let actualValue = isBeyondNormalisedValue(expectedValue, 0, 100);
    expect(actualValue).to.equal(true);
  });

  it("returns true is value is more than normalised", function(){
    let expectedValue = 101;
    let actualValue = isBeyondNormalisedValue(expectedValue, 0, 100);
    expect(actualValue).to.equal(true);
  });
});

describe("Value as percentage of x", function() {
  it("returns percentage of another number", function(){
    let value = 50;
    let x = 200;
    let actualValue = valueAsPercentageOfX(value, x);
    expect(actualValue).to.equal(25);
  });
});