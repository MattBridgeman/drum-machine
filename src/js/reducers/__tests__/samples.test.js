import { expect } from "chai";
import samples from "../samples.reducer";
import { uploadSample, samplesLoaded, samplesUploadError } from "../../actions/samples.actions";

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

  it("returns loaded samples", () => {
    let userId = "asdasdASDSDdasd";
    let _samples = {
      "ertreERTRT": {
        name: "Sample",
        shortName: "SP"
      }
    };
    let action = samplesLoaded(userId, _samples);
    let state = samples(undefined, action);
    expect(state.state).to.equal("loaded");
    expect(state.samples).to.deep.equal({
      "asdasdASDSDdasd": {
        "ertreERTRT": {
          name: "Sample",
          shortName: "SP"
        }
      }
    });
  });

  it("returns upload error", () => {
    let action = samplesUploadError();
    let state = samples(undefined, action);
    expect(state.upload.state).to.equal("error");
  });
});