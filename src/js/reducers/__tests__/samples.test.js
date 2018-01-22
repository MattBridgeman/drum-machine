import { expect } from "chai";
import samples from "../samples.reducer";
import { uploadSample, samplesLoaded, samplesUploadError, samplesUploadReset, sampleUploading, sampleDeleted, sampleDeleteError, deleteSample } from "../../actions/samples.actions";

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

  it("returns upload reset", () => {
    let action = samplesUploadReset();
    let state = samples(undefined, action);
    expect(state.upload.state).to.equal("idle");
  });
  
  it("returns uploading", () => {
    let action = sampleUploading();
    let state = samples(undefined, action);
    expect(state.upload.state).to.equal("uploading");
  });

  it("returns list of samples without deleted sample", () => {
    let action = sampleDeleted("123", "1234");
    let state = samples({
      samples: {
        "123": {
          "1234": { name: "foo" },
          "12345": { name: "bar" }
        }
      }
    }, action);
    expect(state.samples).to.deep.equal({
      "123": {
        "12345": { name: "bar" }
      }
    });
  });
  
  it("switches out 'deleted: true' to false if delete fails", () => {
    let action = sampleDeleteError("123", "1234");
    let state = samples({
      samples: {
        "123": {
          "1234": { name: "foo", deleted: true },
          "12345": { name: "bar" }
        }
      }
    }, action);
    expect(state.samples).to.deep.equal({
      "123": {
        "1234": { name: "foo", deleted: false },
        "12345": { name: "bar" }
      }
    });
  });
  
  it("marks a sample as deleted", () => {
    let action = deleteSample("123", "1234");
    let state = samples({
      samples: {
        "123": {
          "1234": { name: "foo" },
          "12345": { name: "bar" }
        }
      }
    }, action);
    expect(state.samples).to.deep.equal({
      "123": {
        "1234": { name: "foo", deleted: true },
        "12345": { name: "bar" }
      }
    });
  });
});