import { expect } from "chai";
import instruments from "../instruments.reducer";
// import {
//   AUTH_STATE_CHANGE
// } from "../../constants/auth.constants";

describe("Instrument reducer", () => {
	it("returns the default state", () => {
    let state = instruments(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    
    expect(state[0]).to.deep.equal({
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    });
  });
});