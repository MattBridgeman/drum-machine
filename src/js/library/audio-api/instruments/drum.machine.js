import { getAudioContext } from "../context";
import { numberToArrayLength, zip } from "../../natives/array";

export let createDrumMachine = () => {
  let context = getAudioContext();
  let channels = [];

  let init = () => {
    channels = numberToArrayLength(8)
      .map(channel => ({
        volume: context.createGain(),
        master: context.createGain(),
        pan: context.createPanner()
      }));
  
    channels
      .forEach(channelNode => {
        channelNode.master.connect(channelNode.volume);
        channelNode.volume.connect(channelNode.pan);
        channelNode.pan.panningModel = 'equalpower';
      });
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { drumMachine } = state;
    let machine = drumMachine[machineId];

    let atLeastOneChannelSolod = machine.reduce(((prev, channel) => prev || channel.solo), false);

    zip([machine, channels])
      .forEach(([channel, channelNode], index) => {
        channelNode.master.gain.value = channel.mute ? 0: channel.solo ? 1: atLeastOneChannelSolod ? 0 : 1;
        channelNode.volume.gain.value = channel.volume * 0.01;
        channelNode.pan.setPosition(...panPercentageToValue(channel.pan));
      });
    
    //TODO: Implement reverb

    // channels
    //   .filter((channelNode, i) => i === 0)
    //   .forEach(channelNode => {
    //     let reverbSeconds = reverbSecondsPercentageToValue(reverb.seconds);
    //     let reverbDecay = reverbDecayPercentageToValue(reverb.decay);
    //     if(channelNode.reverbNode.seconds !== reverbSeconds) {
    //         channelNode.reverbNode.seconds = reverbSeconds;
    //     }
    //     if(channelNode.reverbNode.decay !== reverbDecay) {
    //         channelNode.reverbNode.decay = reverbDecay;
    //     }
    //   });

  };

  let remove = () => {

  };

  init();

  return {
    update,
    remove,
    outputs: {
      channels
    }
  }
};