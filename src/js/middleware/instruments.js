import { updateInstrumentAudio } from "../library/audio-api/instruments/instrument.audio";
import { updateConnections } from "../library/audio-api/instruments/connections";
import rootReducer from "../reducers/root.reducer";
import { ON_NEW_INSTRUMENT } from "../constants/instruments.constants";
import { newId } from "../library/utils";

export const instruments = store => next => {
  let update = action => {
    let state = rootReducer(store.getState(), action);
    let instrumentNodes = updateInstrumentAudio(state);
    updateConnections(instrumentNodes, state);
  }
  let onNewInstrument = (action, next) => {
    let { drumMachine, synth, instruments } = store.getState();
    const { instrumentType } = action;
    let newAction = {
      ...action,
      id: newId(instruments.map(({ id }) => id))
    };
    switch(instrumentType) {
      case "drumMachine":
        newAction = {
          ...newAction,
          machineId: newId(Object.keys(drumMachine))
        };
        break;
      case "synth":
        newAction = {
          ...newAction,
          machineId: newId(Object.keys(synth))
        };
        break;
    }
    return next(newAction);
  }
	return action => {
    switch(action.type){
      case ON_NEW_INSTRUMENT:
        return onNewInstrument(action, next);
      default:
        update(action);
        return next(action);
    }
  }
};