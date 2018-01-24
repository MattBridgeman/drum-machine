import { expect } from "chai";
import preview from "../preview.reducer";
import { PLAY_PREVIEW, PAUSE_PREVIEW } from "../../constants/preview.constants";

describe("Preview reducer", () => {
	it("switches isPlaying to true if play action", () => {
    let initialState = {
      isPlaying: false,
      soundId: undefined
    };
    let nextState = preview(initialState, {
      type: PLAY_PREVIEW,
      id: 123
    });
    expect(nextState.isPlaying).to.equal(true);
    expect(nextState.soundId).to.equal(123);
  });

  it("switches isPlaying to false if paused action", () => {
    let initialState = {
      isPlaying: true,
      soundId: 123
    };

    let nextState = preview(initialState, {
      type: PAUSE_PREVIEW
    });

    expect(nextState.isPlaying).to.equal(false);
    expect(nextState.soundId).to.equal(123);
  });
});