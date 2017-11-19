import { expect } from "chai";
import { changeTrackTitle } from "../meta.actions";
import { CHANGE_TRACK_TITLE } from "../../constants/meta.constants";

describe("Title actions", function() {

	it("changeTrackTitle returns corresponding action", function() {
		var action = changeTrackTitle({
			title: "Untitled Track"
    });
  });
});