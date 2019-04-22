import { CHANGE_INSTRUMENT } from "../constants/instruments.constants";

export const changeInstrument = (id, type, machineId, index) => {
  return {
    type: CHANGE_INSTRUMENT,
    id,
    instrumentType: type,
    machineId,
    index
  }
}