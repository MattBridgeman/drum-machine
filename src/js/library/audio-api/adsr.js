import { percentageToValueOfRange } from "../natives/numbers";

export const MAX_OUTPUT = 100;
export const MIN_INPUT = 1;
export const MIN_RAMP_MILLISECONDS = 15;
export const MAX_RAMP_MILLISECONDS = 4000;

export let adsr = (keyPressed, elapsedTime, {
    attack,
    decay,
    sustain,
    release
  }, {
    phase = "attack",
    value = 0,
    time = 0
  }) => {
    attack = Math.max(MIN_INPUT, attack);
    decay = Math.max(MIN_INPUT, decay);
    sustain = Math.max(MIN_INPUT, sustain);
    release = Math.max(MIN_INPUT, release);
  phase = keyPressed ? phase : "release";
  switch(phase) {
    case "attack":
      value += 0.1 * ((101 - attack) * elapsedTime)
      if(value >= MAX_OUTPUT) {
        value = MAX_OUTPUT;
        phase = "decay"
      }
      break;
    case "decay":
      value -= 0.1 * (decay * elapsedTime)
      if(value <= sustain) {
        value = sustain;
        phase = "sustain"
      }
      break;
    case "release":
      value -= 0.1 * ((101 - release) * elapsedTime)
      if(value <= 0) {
        value = 0;
      }
      break;
  }
  return {
    phase,
    value,
    time: time + elapsedTime
  };
};

export const getAdsrValues = ({
  attack,
  decay,
  sustain,
  release
}) => {
  return {
    attack: percentageToValueOfRange(attack, MIN_RAMP_MILLISECONDS, MAX_RAMP_MILLISECONDS),
    decay: percentageToValueOfRange(decay, MIN_RAMP_MILLISECONDS, MAX_RAMP_MILLISECONDS),
    sustain: percentageToValueOfRange(sustain, MIN_RAMP_MILLISECONDS, MAX_RAMP_MILLISECONDS),
    release: percentageToValueOfRange(release, MIN_RAMP_MILLISECONDS, MAX_RAMP_MILLISECONDS)
  };
};

const divideBy100 = value => value * value * 0.01;
const ramp = value => value * value * 0.001;
const percentToTimeConstant = value => value * 0.02;

export const setAttackDecayValues = ({
  attack,
  decay,
  sustain
}, startTime, audioParam, normaliseFn = divideBy100) => {
  audioParam.setTargetAtTime(normaliseFn(100), startTime, percentToTimeConstant(attack));
  audioParam.setTargetAtTime(normaliseFn(sustain), startTime + ramp(attack), percentToTimeConstant(100 - decay));
};

export const setSustainReleaseValues = ({
  release
}, startTime, audioParam, normaliseFn = divideBy100) => {
  audioParam.setTargetAtTime(normaliseFn(0), startTime, percentToTimeConstant(release));
};