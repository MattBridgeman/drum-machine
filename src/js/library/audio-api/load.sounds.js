import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";

export let cache = {};

export let loadSounds = state => {
  let { sounds } = state;
  let soundKeys = Object.keys(sounds);
  return soundKeys.map(key => ({
    id: key,
    path: sounds[key].path,
    sound: loadSound(path)
  }));
};

export let loadSound = path => {
  let context = getAudioContext();
  if(cache[path]){
    return cache[path];
  }
  return requestAndDecodeSound(context, path);
};