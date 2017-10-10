import { applyMiddleware } from "redux";
import { supplyAudioContext } from "./audio.context";
import { supplyAudioNodes } from "./audio.nodes";
import { updateAudioParams } from "./audio.params";
import { triggerSounds } from "./trigger.sounds";
import { playState } from "./play.state";
import { buffer } from "./buffer";
import { startNoise } from "./start.noise";
import { supplyAuth } from "./auth";

export default applyMiddleware(
  supplyAuth,
  supplyAudioContext,
  buffer,
  supplyAudioNodes,
  updateAudioParams,
  triggerSounds,
  playState,
  startNoise
);