import { expect } from "chai";
import track from "../track.reducer";
import { LOAD_DEFAULT_TRACK } from "../../constants/track.constants";

describe("Track reducer", () => {
	it("returns the initial track state", () => {
    let state = track(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    expect(state.name).to.equal("Untitled Track");
    expect(state.state).to.equal("idle");
  });
	it("returns the default track state", () => {
    let state = track({}, {
      type: LOAD_DEFAULT_TRACK
    });
    expect(state).to.deep.equal({
      name: "Untitled Track",
      trackId: "default",
      userId: undefined,
      state: "idle",
      write: true
    });
  });
});