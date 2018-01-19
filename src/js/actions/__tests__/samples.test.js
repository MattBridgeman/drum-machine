import { uploadSample, newSampleUploaded, samplesLoaded, samplesUploadError } from "../samples.actions";
import { UPLOAD_SAMPLE, SAMPLE_UPLOADED, SAMPLES_LOADED, SAMPLE_UPLOAD_ERROR } from "../../constants/samples.constants";
import { expect } from "chai";

describe("Samples actions", function() {
	it("returns the corresponding upload action", () => {
		let name = "Sample";
		let shortName = "SM";
		let file = { foo: "bar" };
		let action = uploadSample(name, shortName, file);

		expect(action).to.deep.equal({
			type: UPLOAD_SAMPLE,
			name,
      shortName,
      file
		});
  });

	it("returns the corresponding uploaded action", () => {
		let sample = {
      name: "Sample",
      shortName: "SM",
      path: "https://foo.com",
      createdDate: "2018-10-10",
      sampleId: "asdsaASDdadsd",
      userId: 1234
    };
		let action = newSampleUploaded(sample);

		expect(action).to.deep.equal({
			type: SAMPLE_UPLOADED,
			name: sample.name,
      shortName: sample.shortName,
      path: sample.path,
      createdDate: sample.createdDate,
      sampleId: sample.sampleId,
      userId: sample.userId
		});
  });
  
  it("returns the corresponding loaded action", () => {
    let samples = {
      asdLAJadsdsADL: {
        name: "Sample",
        shortName: "SM",
        path: "https://foo.com",
        createdDate: "2018-10-10"
      }
    };
    let userId = 1234;
    let action = samplesLoaded(userId, samples);

    expect(action).to.deep.equal({
      type: SAMPLES_LOADED,
      userId,
      samples
    });
  });
  
  it("upload error action", () => {
    let action = samplesUploadError();

    expect(action).to.deep.equal({
      type: SAMPLE_UPLOAD_ERROR
    });
  });
});