import { expect } from "chai";
import {
  changeInstrument,
  onNewInstrument,
  deleteInstrument,
  changeInstrumentName
} from "../instruments.actions";

import { 
  ON_NEW_INSTRUMENT,
  CHANGE_INSTRUMENT,
  DELETE_INSTRUMENT,
  CHANGE_INSTRUMENT_NAME
} from "../../constants/instruments.constants";

describe("Instruments actions", () => {
  it("returns a changeInstrument action", () => {
    expect(changeInstrument(1234, "drumMachine", 12345, 0))
      .to.deep.equal({
        type: CHANGE_INSTRUMENT,
        id: 1234,
        instrumentType: "drumMachine",
        machineId: 12345,
        index: 0
      });
  });
  it("returns a onNewInstrument action", () => {
    expect(onNewInstrument("drumMachine"))
      .to.deep.equal({
        type: ON_NEW_INSTRUMENT,
        instrumentType: "drumMachine"
      });
  });
  it("returns a deleteInstrument action", () => {
    expect(deleteInstrument(1234, "drumMachine", 12345, 0))
      .to.deep.equal({
        type: DELETE_INSTRUMENT,
        id: 1234,
        instrumentType: "drumMachine",
        machineId: 12345,
        index: 0
      });
  });
  it("returns a changeInstrumentName action", () => {
    expect(changeInstrumentName(1234, "test name"))
      .to.deep.equal({
        type: CHANGE_INSTRUMENT_NAME,
        id: 1234,
        name: "test name"
      });
  });
});