import { getAudioContext, createBufferSource } from "../context";
import { get } from "../load.sounds";
import { numberToArrayLength, zip, last } from "../../natives/array";
import { panPercentageToValue } from "../pan";
import { loadSounds } from "../load.sounds";
import { buffersSinceId } from "../buffer";
import { pitchToPlaybackRate } from "../playback.rate";
import { decayPercentageToValue } from "../decay";

export let createDrumMachine = () => {
  let context = getAudioContext();
  let channels = [];
  let sounds = {};
  let lastBufferId = undefined;
  let output = context.createGain();
  let send1 = context.createGain();
  let send2 = context.createGain();

  let init = () => {
    channels = numberToArrayLength(9)
      .map(channel => ({
        send1: context.createGain(),
        send2: context.createGain(),
        volume: context.createGain(),
        master: context.createGain(),
        pan: context.createPanner()
      }));
  
    channels
      .forEach(channelNode => {
        channelNode.master.connect(channelNode.volume);
        channelNode.volume.connect(channelNode.pan);
        channelNode.pan.connect(output);
        channelNode.master.connect(channelNode.send1);
        channelNode.master.connect(channelNode.send2);
        channelNode.send1.connect(send1);
        channelNode.send2.connect(send2);
        channelNode.pan.panningModel = "equalpower";
      });
  };

  let update = (instrument, state) => {
    updateSounds(instrument, state);
    updateGains(instrument, state);
    updateSoundTriggers(instrument, state);
  };

  let updateSounds = (instrument, state) => {
    sounds = loadSounds(state);
  };

  let updateGains = (instrument, state) => {
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
        //Unused at the moment
        channelNode.send2.gain.value = 0;
      });
  };

  let updateSoundTriggers = (instrument, state) => {
    let { machineId } = instrument;
    let { drumMachine, buffer, patterns, playState } = state;
    let machine = drumMachine[machineId];
    
    if(!playState.isPlaying) {
      lastBufferId = undefined;
      return;
    }

    let buffers = lastBufferId ? buffersSinceId(lastBufferId, buffer) : buffer;
    if(buffers.length) {
      lastBufferId = last(buffers).id;
    }

    buffers.forEach(item => {
      let { time, index, bar } = item;
      //TODO: Make dynamic for however many drum machines there are
      let soundIds = machine
        .map(channel => channel.sound);

      let pitches = machine
        .map(channel => channel.pitch)
        .map(pitchToPlaybackRate);

      let decays = machine
        .map(channel => channel.decay)
        .map(decayPercentageToValue);

      let patternsArray = machine
        .map(channel => channel.patterns[bar])
        .map(patternId => patterns[patternId]);
      
      let send1Nodes = channels
        .map(channel => channel.send1);

      let reverbs = machine
        .map(channel => channel.reverb);
      
      //create gain nodes for decay
      let decayNodes = machine
        .map(channel => context.createGain());
        
      //connect decay to master
      zip([decayNodes, channels])
        .forEach(([decayNode, channel]) => decayNode.connect(channel.master));
      
      //apply decay to decay node
      zip([decayNodes, decays])
        .forEach(([decayNode, decay]) => decayNode.gain.linearRampToValueAtTime(0, time + decay));
      
      //play sound
      zip([patternsArray, sounds, decayNodes, send1Nodes, reverbs, pitches])
        .filter(([pattern]) => !!pattern[index])
        .forEach(([pattern, sound, decayNode, send1Node, reverb, pitch]) => {
          sound.sound.then(buffer => {
            if(context.time > time) return;
            let bufferSource = createBufferSource(context, buffer);
            bufferSource.playbackRate.value = pitch || 1;
            bufferSource.connect(decayNode);
            // bufferSource.connect(send1Node);
            bufferSource.start(time);
          });
        });
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