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
  return sound;
};

export let loadSound = (soundId, state) => {
  let sound = getSound(soundId, state);
  if(sound) {
    return {
      id: soundId,
      path: sound.path,
      soundPromise: requestSound(sound.path)
    };
  }
};

export let loadSounds = (soundIds, state) => {
  return soundIds
    .map(soundId => loadSound(soundId, state));
};

export let requestSound = path => {
  let context = getAudioContext();
  if(!cache[path]){
    cache[path] = requestAndDecodeSound(context, path);
  }
  return cache[path];
};