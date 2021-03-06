import { expect } from "chai";
import instruments from "../instruments.reducer";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../../constants/track.constants";

describe("Instrument reducer", () => {
	it("returns the default state", () => {
    let state = instruments(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    
    expect(state).to.deep.equal([]);
  });

  it("returns the default state on a new track loading", () => {
    let state = instruments([{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    }], {
      type: NEW_TRACK_LOADING
    });
    
    expect(state).to.deep.equal([]);
  });

  it("loads the default state", () => {
    let state = instruments([], {
      type: LOAD_DEFAULT_TRACK
    });
    
    expect(state[0]).to.deep.equal({
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    });
  });
  
  it("loads the new track state", () => {
    let _instruments = [{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    }];

    let state = instruments([], {
      type: NEW_TRACK_LOADED,
      instruments: _instruments
    });
    
    expect(state).to.deep.equal(_instruments);
  });
});