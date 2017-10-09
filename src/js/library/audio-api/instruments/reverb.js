import { getAudioContext } from "../context";
import { SimpleReverb } from "../../web-audio-components/simple.reverb";
import { reverbSecondsPercentageToValue, reverbDecayPercentageToValue } from "../reverb";

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

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { reverb } = state;
    let machine = reverb[machineId];
    let { seconds, decay } = machine;
    let reverbSeconds = reverbSecondsPercentageToValue(seconds);
    let reverbDecay = reverbDecayPercentageToValue(decay);
    if(reverbNode.seconds !== reverbSeconds) {
        reverbNode.seconds = reverbSeconds;
    }
    if(reverbNode.decay !== reverbDecay) {
        reverbNode.decay = reverbDecay;
    }
  };

  let remove = () => {

  };

  return {
    update,
    remove,
    inputs: {
      main: input
    },
    outputs: {
      main: output
    }
  };
};