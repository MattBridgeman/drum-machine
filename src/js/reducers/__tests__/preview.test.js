import { expect } from "chai";
import preview from "../preview.reducer";
import { PLAY_PREVIEW, PAUSE_PREVIEW, LOADING_PREVIEW } from "../../constants/preview.constants";

describe("Preview reducer", () => {
	it("switches state to playing if play action", () => {
    let initialState = {
      state: "idle",
      soundId: undefined
    };
    let nextState = preview(initialState, {
      type: PLAY_PREVIEW,
      id: 123
    });
    expect(nextState.state).to.equal("playing");
    expect(nextState.soundId).to.equal(123);
  });

  it("switches state to loading if play action", () => {
    let initialState = {
      state: "idle",
      soundId: undefined
    };
    let nextState = preview(initialState, {
      type: LOADING_PREVIEW,
      id: 123
    });
    expect(nextState.state).to.equal("loading");
    expect(nextState.soundId).to.equal(123);
  });

  it("switches state to idle if paused action", () => {
    let initialState = {
      state: "playing",
      soundId: 123
    };

    let nextState = preview(initialState, {
      type: PAUSE_PREVIEW
    });

    expect(nextState.state).to.equal("idle");
    expect(nextState.soundId).to.equal(123);
  });
});