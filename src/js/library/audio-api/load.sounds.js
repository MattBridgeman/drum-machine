import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";
import { getValueFromPath } from "../natives/object";

export let cache = {};

export let getSound = (soundId, state) => {
  let { librarySounds, match, samples } = state;
  let userId = getValueFromPath(match, "params/userId");
  let userSample = getValueFromPath(samples, `samples/${userId}/${soundId}`);
  let librarySample = librarySounds[soundId];
  let sound = userSample || librarySample;
  if(sound) {
    return {
      id: soundId,
      path: sound.path,
      soundPromise: loadSound(sound.path)
    };
  }
};

export let loadSounds = (soundIds, state) => {
  return soundIds
    .map(soundId => getSound(soundId, state));
};

export let loadSound = path => {
  let context = getAudioContext();
  if(!cache[path]){
    cache[path] = requestAndDecodeSound(context, path);
  }
  return cache[path];
};