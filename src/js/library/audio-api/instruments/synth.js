import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { synthStore } from "./store/synth.store";

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
  let looping = false;

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
    createStoreSubscription();
    startLoop();
  };

  let createStoreSubscription = () => {
    synthStore.subscribe(() => {
      let state = synthStore.getState();
    });
  };

  let startLoop = () => {
    if(!looping) loop();
  };

  let loop = () => {
    //do stuff
    synthStore.dispatch({
      type: "TIME_PASSED",
      time: context.currentTime
    });
    timeout.get().then(loop);
    looping = true;
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    updateConnections(instrument, state);
  };

  let updateConnections = (instrument, state) => {
    //TODO: connect FM etc
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