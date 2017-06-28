import { applyMiddleware } from "redux";
import { supplyAudioContext } from "./audio.context";
import { supplyAudioNodes } from "./audio.nodes";
import { updateAudioParams } from "./audio.params";
import { supplySoundBuffers } from "./load.sounds";
import { sequencer } from "./scheduler";
import { triggerSounds } from "./trigger.sounds";
import { buffer } from "./buffer";

export default applyMiddleware(supplyAudioContext, supplyAudioNodes, updateAudioParams, supplySoundBuffers, sequencer(), triggerSounds, buffer);