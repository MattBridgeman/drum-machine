import { expect } from "chai";
import { trackStateChange } from "../track.actions";
import { TRACK_STATE_CHANGE } from "../../constants/track.constants";

describe("Track actions", function() {

	it("trackStateChange returns default track", function() {
		var action = trackStateChange({
			trackType: "default"
    });
  });
});