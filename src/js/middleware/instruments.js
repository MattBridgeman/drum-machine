import { updateInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";
import { updateConnections } from "../library/audio-api/instruments/connections";

export const instruments = store => next => {
  let update = () => {
    let state = store.getState();
    let instrumentNodes = updateInstrumentAudio(state);
    updateConnections(instrumentNodes, state);
  }
	return action => {
    update();
    return next(action);
  }
};