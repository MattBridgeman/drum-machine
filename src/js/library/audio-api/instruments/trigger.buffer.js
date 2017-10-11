import { createBufferSource } from "../context";

export let triggerBuffer = (context, sound, pitch = 1, time) => {
  let bufferSource = createBufferSource(context, buffer);
  bufferSource.playbackRate.value = pitch || 1;
  bufferSource.start(time);
  return bufferSource;
};

export let triggerBufferAndDecay = (context, sound, pitch = 1, time, decay) => {
  let buffer = triggerBuffer(context, sound, pitch, time);
  let decayNode = context.createGain();
  decayNode.gain.linearRampToValueAtTime(0, time + decay);
  buffer.connect(decayNode);
  return decayNode;
};