import { expect } from "chai";
import { playPreview, pausePreview, loadingPreview } from "../preview.actions";
import { PLAY_PREVIEW, PAUSE_PREVIEW, LOADING_PREVIEW } from "../../constants/preview.constants";

describe("Preview actions", function() {

	it("playPreview returns corresponding action", function() {
		var action = playPreview({
			id: 123
    });

    expect(action.type).to.equal(PLAY_PREVIEW);
    expect(action.id).to.equal(123);
  });

	it("loadingPreview returns corresponding action", function() {
		var action = loadingPreview({
			id: 123
    });

    expect(action.type).to.equal(LOADING_PREVIEW);
    expect(action.id).to.equal(123);
  });

	it("pausePreview returns corresponding action", function() {
		var action = pausePreview();

    expect(action.type).to.equal(PAUSE_PREVIEW);
  });
});