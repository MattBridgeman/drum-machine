import { requestAndDecodeSound } from "./request";
import { getAudioContext } from "./context";
import { getValueFromPath } from "../natives/object";

export let cache = {};

export let getSound = (soundId, state, userId) => {
  let { librarySounds, track, samples } = state;
  userId = userId || getValueFromPath(track, "userId");
  let userSample = getValueFromPath(samples, `samples/${userId}/${soundId}`);
  let librarySample = librarySounds[soundId];
  let sound = userSample || librarySample;
  return sound || {
    name: '---',
    shortName: '---'
  };
};

export let loadSound = (soundId, state, userId) => {
  let sound = getSound(soundId, state, userId);
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