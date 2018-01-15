import { expect } from "chai";
import samples from "../samples.reducer";
import { uploadSample } from "../../actions/samples.actions";

describe("Samples reducer", () => {
  it("returns an idle upload state given a file", () => {
    let action = uploadSample("sample name", "SN", {
      foo: "bar"
    });
    let state = samples(undefined, action);
    expect(state.upload).to.deep.equal({
      state: "idle",
      file: {
        name: "sample name",
        shortName: "SN",
        file: {
          foo: "bar"
        }
      }
    });
  });
});