import { INSTRUMENTS_MAP } from "../../constants/instruments.constants";

export const getInstrumentTitle = ({ type, name }) => {
  return name || `Untitled ${INSTRUMENTS_MAP[type].friendlyName}`
};