import { updateInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";
import { updateConnections } from "../library/audio-api/instruments/connections";
import rootReducer from "../reducers/root.reducer";

export const instruments = store => next => {
  let update = action => {
    let state = rootReducer(store.getState(), action);
    let instrumentNodes = updateInstrumentAudio(state);
    updateConnections(instrumentNodes, state);
  }
	return action => {
    update(action);
    return next(action);
  }
};