import { expect } from "chai";
import { newTrackLoading, newTrackSave, newTrackLoaded } from "../track.actions";
import { NEW_TRACK_LOADING, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../../constants/track.constants";

describe("Track actions", function() {
	it("newTrackLoading returns new track action", function() {
    let userId = 123;
    let trackId = 234;
		var action = newTrackLoading(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK_LOADING);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
	it("newTrackSave returns new track save action", function() {
    let userId = 123;
    let trackId = 234;
		var action = newTrackSave(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK_SAVE);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
	it("newTrackLoaded returns new track loaded action", function() {
    let connections = [];
    let drumMachine = {
      0: {
        currentBankIndex: 0,
        swing: 0
      }
    };
    let state = {
      connections,
      drumMachine
    };
		var action = newTrackLoaded(state);
    expect(action.type).to.equal(NEW_TRACK_LOADED);
    expect(action.connections).to.equal(connections);
    expect(action.drumMachine).to.equal(drumMachine);
  });
});