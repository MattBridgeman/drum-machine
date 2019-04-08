import { percentageToValueOfRange, normaliseValue } from "../natives/numbers";

const { min, max } = Math;

export const MAX_OUTPUT = 100;
export const MIN_INPUT = 1;
export const MIN_RAMP_SECONDS = 0.015;
export const MAX_RAMP_SECONDS = 10;
export const MIN_RAMP_TIME_CONSTANT = 0.003;
export const MAX_RAMP_TIME_CONSTANT = 2;

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
    attack = max(MIN_INPUT, attack);
    decay = max(MIN_INPUT, decay);
    sustain = max(MIN_INPUT, sustain);
    release = max(MIN_INPUT, release);
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

const divideBy100 = value => value * value * 0.01;
const ramp = value => normaliseValue(value * value * 0.001, MIN_RAMP_SECONDS, MAX_RAMP_SECONDS); //exponential curve - 10 second max ramp
const percentToTimeConstant = value => normaliseValue(value * 0.02, MIN_RAMP_TIME_CONSTANT, MAX_RAMP_TIME_CONSTANT); //Max 2 second time constant (5 * time constant is when value change is complete)

export const setAttackDecayValues = ({
  attack,
  decay,
  sustain
}, startTime, audioParam, normalise = divideBy100) => {
  audioParam.setTargetAtTime(normalise(100), startTime, percentToTimeConstant(attack));
  audioParam.setTargetAtTime(normalise(sustain), startTime + ramp(attack), percentToTimeConstant(100 - decay));
};

export const setSustainReleaseValues = ({
  release
}, startTime, audioParam, normalise = divideBy100, timeConstant) => {
  audioParam.setTargetAtTime(normalise(0), startTime, percentToTimeConstant(release));
};