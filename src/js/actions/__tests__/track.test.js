import { expect } from "chai";
import { newTrackLoading, newTrackSave, newTrackLoaded, saveTrack, loadDefaultTrack } from "../track.actions";
import { NEW_TRACK_LOADING, NEW_TRACK_SAVE, NEW_TRACK_LOADED, TRACK_SAVE, LOAD_DEFAULT_TRACK } from "../../constants/track.constants";

describe("Track actions", () => {
	it("newTrackLoading returns new track action", () => {
    let userId = 123;
    let trackId = 234;
		let action = newTrackLoading(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK_LOADING);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
	it("newTrackSave returns new track save action", () => {
    let userId = 123;
    let trackId = 234;
		let action = newTrackSave(userId, trackId);
    expect(action.type).to.equal(NEW_TRACK_SAVE);
    expect(action.userId).to.equal(userId);
    expect(action.trackId).to.equal(trackId);
  });
	it("newTrackLoaded returns new track loaded action", () => {
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
		let action = newTrackLoaded(state);
    expect(action.type).to.equal(NEW_TRACK_LOADED);
    expect(action.connections).to.equal(connections);
    expect(action.drumMachine).to.equal(drumMachine);
  });
	it("newTrackLoaded returns write false if specified", () => {
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
    let write = false;
		let action = newTrackLoaded(state, write);
    expect(action.write).to.equal(false);
  });
	it("saveTrack returns corresponding action", () => {
		let action = saveTrack();
    expect(action.type).to.equal(TRACK_SAVE);
  });
	it("loadDefaultTrack returns corresponding action", () => {
		let action = loadDefaultTrack();
    expect(action.type).to.equal(LOAD_DEFAULT_TRACK);
  });
});