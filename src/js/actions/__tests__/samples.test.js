import { uploadSample, newSampleUploaded, samplesLoaded, samplesUploadError, samplesUploadReset, sampleUploading, sampleDeleteError, deleteSample, sampleDeleted } from "../samples.actions";
import { UPLOAD_SAMPLE, SAMPLE_UPLOADED, SAMPLES_LOADED, SAMPLE_UPLOAD_ERROR, SAMPLE_UPLOAD_RESET, SAMPLE_UPLOADING, SAMPLE_DELETED, SAMPLE_DELETE_ERROR, DELETE_SAMPLE } from "../../constants/samples.constants";
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
  
  it("returns upload error action", () => {
    let action = samplesUploadError();

    expect(action).to.deep.equal({
      type: SAMPLE_UPLOAD_ERROR
    });
  });
  
  it("returns delete sample action", () => {
    let action = deleteSample("123", "1234");

    expect(action).to.deep.equal({
      type: DELETE_SAMPLE,
      userId: "123",
      id: "1234"
    });
  });
  
  it("returns upload reset action", () => {
    let action = samplesUploadReset();

    expect(action).to.deep.equal({
      type: SAMPLE_UPLOAD_RESET
    });
  });
  
  it("returns uploading action", () => {
    let action = sampleUploading();

    expect(action).to.deep.equal({
      type: SAMPLE_UPLOADING
    });
  });
  
  it("returns deleted action", () => {
    let action = sampleDeleted(123, 1234);

    expect(action).to.deep.equal({
      type: SAMPLE_DELETED,
      userId: 123,
      id: 1234
    });
  });

  it("returns sample delete error action", () => {
    let action = sampleDeleteError(123, 1234);

    expect(action).to.deep.equal({
      type: SAMPLE_DELETE_ERROR,
      userId: 123,
      id: 1234
    });
  });
});