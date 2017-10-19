import { expect } from "chai";
import track from "../track.reducer";

describe("Track reducer", () => {
	it("returns the default track state", () => {
    let state = track();
    expect(state.name).to.equal("Untitled Track");
    expect(state.state).to.equal("preload");
  });
});