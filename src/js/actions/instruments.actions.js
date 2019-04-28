import { CHANGE_INSTRUMENT, ON_NEW_INSTRUMENT, DELETE_INSTRUMENT } from "../constants/instruments.constants";

export const changeInstrument = (id, type, machineId, index) => {
  return {
    type: CHANGE_INSTRUMENT,
    id,
    instrumentType: type,
    machineId,
    index
  }
};

export const onNewInstrument = (type) => {
  return {
    type: ON_NEW_INSTRUMENT,
    instrumentType: type
  }
};

export const deleteInstrument = (id, type, machineId, index) => {
  return {
    type: DELETE_INSTRUMENT,
    id,
    instrumentType: type,
    machineId,
    index
  }
};