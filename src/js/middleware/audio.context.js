import { newAudioContext } from "../actions/audio.context.actions";
import { createAudioContext } from "../library/audio-api/context";

export const supplyAudioContext = store => next => {
	// creation of context
	let context = createAudioContext();
    next(newAudioContext(context));

	return action => next(action);
};