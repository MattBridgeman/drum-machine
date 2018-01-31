import { getAudioContext } from "../context";

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voices = [];
  let tmpVoice = null;
  let tmpFM = null;

  let init = () => {
    tmpVoice = context.createOscillator();
    tmpVoice.type = 'square';
    tmpVoice.frequency.setValueAtTime(110, 0);
    tmpVoice.connect(output);
    //tmpVoice.start();

    tmpFM = context.createOscillator();
    tmpFM.type = 'triangle';
    tmpFM.frequency.setValueAtTime(110, 0);
    //tmpFM.connect(output.gain);
    tmpFM.start();
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