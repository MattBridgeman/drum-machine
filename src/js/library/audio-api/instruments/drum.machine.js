import { getAudioContext } from "../context";
import { numberToArrayLength, zip } from "../../natives/array";
import { panPercentageToValue } from "../pan";

export let createDrumMachine = () => {
  let context = getAudioContext();
  let channels = [];
  let output = context.createGain();
  let send1 = context.createGain();
  let send2 = context.createGain();

  let init = () => {
    channels = numberToArrayLength(8)
      .map(channel => ({
        send1: context.createGain(),
        send2: context.createGain(),
        volume: context.createGain(),
        master: context.createGain(),
        pan: context.createPanner()
      }));
  
    channels
      .forEach(channelNode => {
        output.connect(channelNode.master);
        channelNode.master.connect(channelNode.volume);
        channelNode.volume.connect(channelNode.pan);
        channelNode.send1.connect(send1);
        channelNode.send2.connect(send2);
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
        channelNode.send1.gain.value = channel.reverb ? 1 : 0;
      });

  };

  let remove = () => {
    context = null;
    channels = null;
  };

  init();

  return {
    update,
    remove,
    outputs: {
      main: output,
      send1,
      send2,
      channels
    }
  }
};