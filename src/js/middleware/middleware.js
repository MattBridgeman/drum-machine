import { applyMiddleware } from "redux";
import { supplyAudioContext } from "./audio.context";
import { supplyAudioNodes } from "./audio.nodes";
import { updateAudioParams } from "./audio.params";
import { supplySoundBuffers } from "./load.sounds";
import { triggerSounds } from "./trigger.sounds";
import { playState } from "./play.state";
import { buffer } from "./buffer";
import { startNoise } from "./start.noise";

export default applyMiddleware(supplyAudioContext, buffer, supplyAudioNodes, updateAudioParams, supplySoundBuffers, triggerSounds, playState, startNoise);