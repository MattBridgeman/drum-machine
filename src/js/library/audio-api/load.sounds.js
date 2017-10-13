import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";

export let cache = {};

export let loadSounds = state => {
  let { sounds } = state;
  let soundKeys = Object.keys(sounds);
  return soundKeys.map(key => ({
    id: key,
    path: sounds[key].path,
    soundPromise: loadSound(sounds[key].path)
  }));
};

export let loadSound = path => {
  let context = getAudioContext();
  if(!cache[path]){
    cache[path] = requestAndDecodeSound(context, path);
  }
  return cache[path];
};