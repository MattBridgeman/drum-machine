import { getAudioContext } from "../context";

export let createMaster = () => {
  let context = getAudioContext();
  let master = context.createGain();
  master.connect(context.destination);
  return {
    inputs: {
      master
    }
  }
};
