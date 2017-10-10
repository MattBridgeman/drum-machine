import { getAudioContext } from "../context";
import { get } from "../load.sounds";
import { numberToArrayLength, zip } from "../../natives/array";
import { panPercentageToValue } from "../pan";
import { loadSounds } from "../load.sounds";

export let createDrumMachine = () => {
  let context = getAudioContext();
  let channels = [];
  let sounds = {};
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
    updateSounds(instrument, state);
    updateGains(instrument, state);
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
      });
  };

  let onNewBufferSegment = () => {
    let prevState = store.getState();
		let state = rootReducer(prevState, action);

		let { index, time } = action;
		let { drumMachine, patterns } = state;
		let { currentBarIndex } = state.playState;

		//TODO: Make dynamic for however many drum machines there are
		let soundIds = drumMachine["0"]
			.map(channel => channel.sound);

		let pitches = drumMachine["0"]
			.map(channel => channel.pitch)
			.map(pitchToPlaybackRate);

		let decays = drumMachine["0"]
			.map(channel => channel.decay)
			.map(decayPercentageToValue);

		let patternsArray = drumMachine["0"]
			.map(channel => channel.patterns[currentBarIndex])
			.map(patternId => patterns[patternId]);
		
		let reverbNodes = sourceNodes
			.map(sourceNode => sourceNode.reverbNode);

		let reverbs = drumMachine["0"]
			.map(channel => channel.reverb);
		
		//create gain nodes for decay
		let decayNodes = drumMachine["0"]
			.map(channel => context.createGain());
			
		//connect decay to master
		zip([decayNodes, sourceNodes])
			.forEach(([decayNode, sourceNode]) => decayNode.connect(sourceNode.master));
		
		//apply decay to decay node
		zip([decayNodes, decays])
			.forEach(([decayNode, decay]) => decayNode.gain.linearRampToValueAtTime(0, time + decay));
		
		//play sound
		zip([patternsArray, sounds, decayNodes, reverbNodes, reverbs, pitches])
			.filter(([pattern]) => !!pattern[index])
			.forEach(([pattern, buffer, decayNode, reverbNode, reverb, pitch]) => {
				let bufferSource = createBufferSource(context, buffer);
				bufferSource.playbackRate.value = pitch || 1;
				bufferSource.connect(decayNode);
				if(reverb){
					bufferSource.connect(reverbNode);
				}
				bufferSource.start(time);
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