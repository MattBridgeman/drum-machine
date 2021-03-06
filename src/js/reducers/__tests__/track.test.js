import { expect } from "chai";
import track from "../track.reducer";
import { LOAD_DEFAULT_TRACK, NEW_TRACK_SAVE, NEW_TRACK_LOADED } from "../../constants/track.constants";

describe("Track reducer", () => {
	it("returns the initial track state", () => {
    let state = track(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    expect(state).to.deep.equal({});
  });
	it("returns the default track state", () => {
    let state = track({}, {
      type: LOAD_DEFAULT_TRACK
    });
    expect(state).to.deep.equal({
      trackId: "default",
      userId: undefined,
      state: "idle",
      write: true
    });
  });
	it("returns the new track save state", () => {
    let state = track({
      trackId: "default",
      userId: undefined,
      state: "idle",
      write: true
    }, {
      type: NEW_TRACK_SAVE,
      trackId: 123,
      userId: 234
    });
    expect(state).to.deep.equal({
      trackId: 123,
      userId: 234,
      state: "idle",
      write: true
    });
  });
	it("returns new track loaded state and 'idle'", () => {
    let state = track({
      trackId: 123,
      userId: 234,
      state: "loading"
    }, {
      type: NEW_TRACK_LOADED,
      write: true,
      track: {
        write: true
      }
    });
    expect(state).to.deep.equal({
      write: true,
      trackId: 123,
      userId: 234,
      state: "idle"
    });
  });
  it("returns write status of false if specified", () => {
    let state = track({
      trackId: 123,
      userId: 234,
      state: "loading",
      write: true
    }, {
      type: NEW_TRACK_LOADED,
      write: false,
      track: {
        write: true
      }
    });
    expect(state.write).to.equal(false);
  });
});