import { expect } from "chai";
import tracks from "../tracks.reducer";
import { USER_TRACKS_LOADED, USER_TRACKS_LOADING, USER_TRACKS_LOAD_ERROR } from "../../constants/tracks.constants";

describe("Tracks reducer", () => {

	it("returns the initial track state", () => {
    let state = tracks(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    expect(state).to.deep.equal({
      state: "idle",
      tracks: {}
    });
  });

	it("returns user track loading state", () => {
    let userId = 1234;
    let state = tracks(undefined, {
      type: USER_TRACKS_LOADING,
      userId
    });
    expect(state).to.deep.equal({
      state: "loading",
      tracks: {}
    });
  });

  it("returns user track loaded state", () => {
    let userId = 1234;
    let _tracks = [{
      meta: {
        name: "Untitled Track"
      }
    }];
    let state = tracks(undefined, {
      type: USER_TRACKS_LOADED,
      tracks: _tracks,
      userId
    });
    expect(state).to.deep.equal({
      state: "idle",
      tracks: {
        "1234": _tracks
      }
    });
  });
  
  it("returns user track error state", () => {
    let userId = 1234;
    let error = "Some useful error message";
    let state = tracks(undefined, {
      type: USER_TRACKS_LOAD_ERROR,
      error
    });
    expect(state).to.deep.equal({
      state: "error",
      error,
      tracks: {}
    });
  });
});