import { expect } from "chai";
import ogen from "../ogen";

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
  });
  it("Yields async result from a generator", () => {
    let promise = new Promise(resolve => setTimeout(resolve, 200));
    let asyncValue = promise.then(() => "foobar");
    let generatorFn = function*(){
      yield asyncValue;
      yield 2;
    };
    let value = generatorFn().next().value;
    expect(value).to.equal(asyncValue);
  });
});

describe("Ogen", () => {
  it("Wraps generator", (done) => {
    let promise = new Promise(resolve => setTimeout(resolve, 200));
    let asyncValue = promise.then(() => "foobar");
    let generatorFn = function*(){
      yield asyncValue;
      yield 2;
    };
    let i = -1;
    let asyncFn = ogen(generatorFn);
    asyncFn()
      .subscribe((value) => {
        i++;
        if(i == 0) expect(value).to.equal("foobar");
        if(i == 1) expect(value).to.equal(2);
      },
      () => null,
      () => done());
  });
});