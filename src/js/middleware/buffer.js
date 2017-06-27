import { NEW_AUDIO_CONTEXT } from "../constants/audio.context.constants";

export const buffer = store => next => {
    
  let context;

	return action => {
    //do stuff
    switch(action.type) {
      case NEW_AUDIO_CONTEXT:
        context = action.value;
        return next(action);
      default:
        return next(action);
    }
  }
};