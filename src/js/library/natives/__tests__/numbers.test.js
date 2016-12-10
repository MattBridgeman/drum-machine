import { expect } from "chai";
import { normaliseValue, isBeyondNormalisedValue, valueAsPercentageOfX } from "../numbers";

describe("Normalised value", function() {

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