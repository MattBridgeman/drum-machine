import { expect } from "chai";
import meta from "../meta.reducer";
import {
    CHANGE_TRACK_TITLE,
    CHANGE_TRACK_CREATED_DATE,
    CHANGE_TRACK_UPDATED_DATE
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

	it("changes the track created date", () => {
    let initialState = {
      title: "Untitled Track"
    };
    let nextState = meta(initialState, {
      type: CHANGE_TRACK_CREATED_DATE,
      createdDate: 123456
    });
    expect(nextState.createdDate).to.equal(123456);
  });
  
  it("changes the track updated date", () => {
    let initialState = {
      title: "Untitled Track"
    };
    let nextState = meta(initialState, {
      type: CHANGE_TRACK_UPDATED_DATE,
      updatedDate: 123456
    });
    expect(nextState.updatedDate).to.equal(123456);
  });
});