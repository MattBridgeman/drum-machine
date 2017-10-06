import { updateInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";

export const instruments = store => next => {
  let update = () => {
    let { instruments } = store.getState();
    updateInstrumentAudio(instruments);
  }
	return action => {
		switch (action.type) {
      default:
        update();
        return next(action);
    }
  }
};