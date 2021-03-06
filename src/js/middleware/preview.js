import { PLAY_PREVIEW } from "../constants/preview.constants";
import { loadSound } from "../library/audio-api/load.sounds";
import { triggerBuffer } from "../library/audio-api/instruments/trigger.buffer";
import { getAudioContext } from "../library/audio-api/context";
import { loadingPreview, playPreview, pausePreview } from "../actions/preview.actions";

export const preview = store => next => {

  let bufferNode = undefined;
  let context = getAudioContext();

  let onPlayPreview = action => {
    let { userId, id } = action;
    let state = store.getState();
    let { soundPromise } = loadSound(id, state, userId);
    next(loadingPreview(id));
    soundPromise.then(soundBuffer => {
      next(playPreview(userId, id));
      bufferNode = triggerBuffer(context, soundBuffer);
      bufferNode.connect(context.destination);
      bufferNode.onended = function(){
        next(pausePreview());
      };
    });
  };

	return action => {
    switch(action.type){
      case PLAY_PREVIEW:
        onPlayPreview(action);
        return; //deliberately don't pass on action
    }
    return next(action);
  }
};