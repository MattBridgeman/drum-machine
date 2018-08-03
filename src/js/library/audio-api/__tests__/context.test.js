import { decodeAudioData } from "../context";
import { expect } from "chai";
import td from "testdouble";

describe("Context", () => {
	it("Promisifies decodeAudioData", () => {
    let context = {
      decodeAudioData: td.function()
    };
    let buffer = [1,2,3,4];

    decodeAudioData(context, buffer);

    td.verify(context.decodeAudioData(buffer, td.matchers.anything(), td.matchers.anything()));
  });
});