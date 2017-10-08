import { getAudioContext } from "../context";
import { SimpleReverb } from "../../web-audio-components/simple.reverb";

export let createReverb = () => {
  let context = getAudioContext();

  let reverbNode = new SimpleReverb(context, {
    seconds: 2,
    decay: 2,
    reverse: 0
  });

  let master = context.createGain();
  let input = context.createGain();
  let output = context.createGain();

  input.connect(reverbNode.input);
  reverbNode.connect(output);
  //output.connect(master);

  return {
    inputs: {
      main: input
    },
    outputs: {
      main: output
    }
  };
};