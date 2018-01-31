import { getAudioContext } from "../context";

export let createSynth = () => {

  let context = getAudioContext();

  let init = () => {

  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    console.log(currentSynth);
  };
  
  let remove = () => {
    context = null;
  };

  return {
    update,
    remove
  }
};