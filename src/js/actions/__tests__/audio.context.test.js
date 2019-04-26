import { expect } from "chai";
import { newAudioContext, newSoundBuffers, newSourceNodes } from "../audio.context.actions";
import { NEW_AUDIO_CONTEXT, NEW_SOUND_BUFFERS, NEW_SOURCE_NODES } from "../../constants/audio.context.constants";

describe("Audio Context actions", () => {

	it("newAudioContext returns corresponding action", () => {
    const context = {};
    var action = newAudioContext(context);
    expect(action).to.deep.equal({
      type: NEW_AUDIO_CONTEXT,
      value: context
    });
  });

	it("newSoundBuffers returns corresponding action", () => {
    const buffers = {};
    var action = newSoundBuffers(buffers);
    expect(action).to.deep.equal({
      type: NEW_SOUND_BUFFERS,
      value: buffers
    });
  });

	it("newSourceNodes returns corresponding action", () => {
    const sourceNodes = {};
    var action = newSourceNodes(sourceNodes);
    expect(action).to.deep.equal({
      type: NEW_SOURCE_NODES,
      value: sourceNodes
    });
  });
  
});