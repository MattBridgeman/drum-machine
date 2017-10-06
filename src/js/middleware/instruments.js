import { updateInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";

export const instruments = store => next => {
  let update = () => {
    let state = store.getState();
    updateInstrumentAudio(state);
  }
	return action => {
    update();
    return next(action);
  }
};