import { expect } from "chai";
import { userTracksLoading, userTracksLoaded } from "../tracks.actions";
import { USER_TRACKS_LOADED, USER_TRACKS_LOADING } from "../../constants/tracks.constants";

describe("Tracks actions", () => {

	it("userTracksLoading returns action", () => {
    let userId = 123;
		var action = userTracksLoading(userId);
    expect(action.type).to.equal(USER_TRACKS_LOADING);
    expect(action.userId).to.equal(userId);
  });

	it("userTracksLoaded returns action", () => {
    let userId = 123;
    let tracks = [{
      meta: {
        name: "Untitled Track"
      }
    }];
		var action = userTracksLoaded(userId, tracks);
    expect(action.type).to.equal(USER_TRACKS_LOADED);
    expect(action.userId).to.equal(userId);
    expect(action.tracks).to.equal(tracks);
  });
});