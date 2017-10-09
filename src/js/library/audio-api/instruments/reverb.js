import { getAudioContext } from "../context";
import { SimpleReverb } from "../../web-audio-components/simple.reverb";
import { reverbSecondsPercentageToValue, reverbDecayPercentageToValue } from "../reverb";

export let createReverb = () => {
  let context = getAudioContext();

  let reverb = new SimpleReverb(context, {
    seconds: 2,
    decay: 2,
    reverse: 0
  });

  let master = context.createGain();
  let input = context.createGain();
  let output = context.createGain();

  input.connect(reverb.input);
  reverb.connect(output);

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { reverb } = state;
    let machine = reverb[machineId];
    let { seconds, decay } = machine;
    let reverbSeconds = reverbSecondsPercentageToValue(seconds);
    let reverbDecay = reverbDecayPercentageToValue(decay);
    if(reverb.seconds !== reverbSeconds) {
      reverb.seconds = reverbSeconds;
    }
    if(reverb.decay !== reverbDecay) {
      reverb.decay = reverbDecay;
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