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
  let prereverbGain = context.createGain();
  let reverbGain = context.createGain();

  prereverbGain.connect(reverbNode.input);
  reverbNode.connect(reverbGain);
  //reverbGain.connect(master);

  return {
    inputs: {
      main: prereverbGain
    }
  };
};