import { expect } from "chai";
import meta from "../meta.reducer";
import {
    CHANGE_TRACK_TITLE
} from "../../constants/meta.constants";
import { NEW_TRACK_LOADING, NEW_TRACK_LOADED, LOAD_DEFAULT_TRACK } from "../../constants/track.constants";

describe("Meta reducer", () => {
	it("changes the track title", () => {
    let initialState = {
      title: "Untitled Track"
    };
    let nextState = meta(initialState, {
      type: CHANGE_TRACK_TITLE,
      title: "New Title"
    });
    expect(nextState.title).to.equal("New Title");
  });
});