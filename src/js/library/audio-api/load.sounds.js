import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";

export let cache = {};

export let loadSounds = state => {
  let { librarySounds } = state;
  let soundKeys = Object.keys(librarySounds);
  return soundKeys.map(key => ({
    id: key,
    path: librarySounds[key].path,
    soundPromise: loadSound(librarySounds[key].path)
  }));
};

export let loadSound = path => {
  let context = getAudioContext();
  if(!cache[path]){
    cache[path] = requestAndDecodeSound(context, path);
  }
  return cache[path];
};