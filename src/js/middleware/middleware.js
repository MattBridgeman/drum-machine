import { supplyAudioContext } from "../middleware/audio.context";
import { supplyAudioNodes } from "../middleware/audio.nodes";
import { updateAudioParams } from "../middleware/audio.params";
import { supplySoundBuffers } from "../middleware/load.sounds";
import { sequencer } from "../middleware/scheduler";
import { triggerSounds } from "../middleware/buffer";

export default applyMiddleware(supplyAudioContext, supplyAudioNodes, updateAudioParams, supplySoundBuffers, sequencer(), triggerSounds);