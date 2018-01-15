import { uploadSample } from "../samples.actions";
import { UPLOAD_SAMPLE } from "../../constants/samples.constants";
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
});