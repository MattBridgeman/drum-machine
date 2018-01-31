import { getAudioContext } from "../context";

export const MAX_VOICES = 16;

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voices = new Array(MAX_VOICES);
  let voiceNodes = null;
  let volumeNode = null;
  let panNode = null;
  let send1 = null;
  let send2 = null;

  let init = () => {
    voiceNodes = voices.map(_ => {
      return {
        oscillators: {
          osc1: context.createOscillator(),
          osc2: context.createOscillator()
        },
        gains: {
          amount: context.createGain(),
          amp: context.createGain(),
          filter: context.createBiquadFilter(),
          output: context.createGain()
        }
      };
    });
    volumeNode = context.createGain();
    panNode = context.createPanner();
    send1 = context.createGain();
    send2 = context.createGain();
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
  };
  
  let remove = () => {
    context = null;
  };

  init();

  return {
    update,
    remove,
    outputs: {
      main: output
    }
  }
};