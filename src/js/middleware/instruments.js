import { getInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";

export const instruments = store => next => {
  let isInit = false;
  let init = () => {
    let { instruments } = store.getState();
    let instrumentAudio = getInstrumentAudio(instruments);
  }
	return action => {
    if(!isInit) {
      isInit = true;
      init();
    }
		switch (action.type) {
      default:
        return next(action);
    }
  }
};