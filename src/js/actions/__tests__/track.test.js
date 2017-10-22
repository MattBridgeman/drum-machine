import { expect } from "chai";
import { newTrackLoading } from "../track.actions";
import { NEW_TRACK_LOADING } from "../../constants/track.constants";

describe("Track actions", function() {
	it("newTrackLoading returns new track action", function() {
    let userId = 123;
    let trackId = 234;
		var action = newTrackLoading(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK_LOADING);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
});