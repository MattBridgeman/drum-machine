import { expect } from "chai";
import { trackStateChange, newTrack } from "../track.actions";
import { TRACK_STATE_CHANGE, NEW_TRACK } from "../../constants/track.constants";

describe("Track actions", function() {
	it("newTrack returns new track action", function() {
    let userId = 123;
    let trackId = 234;
		var action = newTrack(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
	it("trackStateChange returns default track", function() {
		var action = trackStateChange({
			trackType: "default"
    });
  });
});