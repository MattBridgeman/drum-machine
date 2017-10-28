import { expect } from "chai";
import sounds from "../sounds.reducer";
import {
  NEW_TRACK_LOADING,
  LOAD_DEFAULT_TRACK
} from "../../constants/track.constants";

describe("Sounds reducer", () => {
	it("returns the initial state on new track load", () => {
    let initialState = {
      0: {
        name: "Bass Drum",
        shortName: "BD",
        path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fbd01.WAV?alt=media&token=77f710d5-78d0-444f-8b0e-33ffd2a5809b"
      }
    };
    let nextState = sounds(initialState, {
      type: NEW_TRACK_LOADING
    });
    expect(nextState).to.deep.equal({});
  });
	it("returns the default track", () => {
    let initialState = {};
    let nextState = sounds(initialState, {
      type: LOAD_DEFAULT_TRACK
    });
    expect(nextState[0]).to.deep.equal({
      name: "Bass Drum",
      shortName: "BD",
      path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fbd01.WAV?alt=media&token=77f710d5-78d0-444f-8b0e-33ffd2a5809b"
    });
  });
});