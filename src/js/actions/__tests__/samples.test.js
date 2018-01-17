import { uploadSample, newSampleUploaded } from "../samples.actions";
import { UPLOAD_SAMPLE, SAMPLE_UPLOADED } from "../../constants/samples.constants";
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
		let name = "Sample";
		let shortName = "SM";
    let path = "https://foo.com";
    let createdDate = "2018-10-10";
		let action = newSampleUploaded(name, shortName, path, createdDate);

		expect(action).to.deep.equal({
			type: SAMPLE_UPLOADED,
			name,
      shortName,
      path,
      createdDate
		});
  });
});