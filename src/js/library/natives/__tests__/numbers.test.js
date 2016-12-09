import { expect } from "chai";
import { normaliseValue, isBeyondNormalisedValue } from "../numbers";

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