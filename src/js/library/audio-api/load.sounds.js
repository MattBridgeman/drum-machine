import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";

export let cache = {};

export let loadSounds = state => {
  let { sounds } = state;
  let paths = getSoundPaths(sounds);
  return paths.map(loadSound);
};

export let loadSound = path => {
  let context = getAudioContext();
  if(cache[path]){
    return cache[path];
  }
  return requestAndDecodeSound(context, path);
};

let getSoundPaths = (sounds) => {
  let soundKeys = Object.keys(sounds);
  return soundKeys.map(key => sounds[key].path);
};