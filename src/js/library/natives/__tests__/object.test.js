import { expect } from "chai";
import { getValueFromPath } from "../object";

describe("getValueFromPath", function() {
  it("returns 'foo' given an object", () => {
    let value = getValueFromPath({ random: { path: "foo" } }, "random/path");
    expect(value).to.equal("foo");
  });
});