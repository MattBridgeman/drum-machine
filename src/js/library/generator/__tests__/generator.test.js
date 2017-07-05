import { expect } from "chai";

describe("Generator", () => {
  it("Can define a generator", () => {
    let generatorFn = function*(){
      yield 1;
      yield 2;
    };
    expect(typeof generatorFn).to.equal("function");
  });
  it("Yields results from a generator", () => {
    let generatorFn = function*(){
      yield 1;
      yield 2;
    };
    let value = generatorFn().next().value;
    expect(value).to.equal(1);
  })
});