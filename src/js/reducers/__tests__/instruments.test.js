import { expect } from "chai";
import instruments from "../instruments.reducer";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED } from "../../constants/track.constants";
import { CHANGE_INSTRUMENT, ON_NEW_INSTRUMENT, DELETE_INSTRUMENT, CHANGE_INSTRUMENT_NAME } from "../../constants/instruments.constants";

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
  
  it("changes selected instrument", () => {
    let _instruments = [{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    },{
      id: 1,
      type: "synth",
      machineId: 0,
      selected: false
    }];

    let state = instruments(_instruments, {
      type: CHANGE_INSTRUMENT,
      id: 1
    });
    
    expect(state).to.deep.equal([{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: false
    },{
      id: 1,
      type: "synth",
      machineId: 0,
      selected: true
    }]);
  });
  
  it("adds new instrument", () => {
    let _instruments = [{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    },{
      id: 1,
      type: "synth",
      machineId: 0,
      selected: false
    }];

    let state = instruments(_instruments, {
      type: ON_NEW_INSTRUMENT,
      id: 2,
      instrumentType: "reverb",
      machineId: 0
    });
    
    expect(state).to.deep.equal([{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: false
    },{
      id: 1,
      type: "synth",
      machineId: 0,
      selected: false
    },{
      id: 2,
      type: "reverb",
      machineId: 0,
      selected: true
    }]);
  });
  
  it("deletes instrument", () => {
    let _instruments = [{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    },{
      id: 1,
      type: "synth",
      machineId: 0,
      selected: false
    }];

    let state = instruments(_instruments, {
      type: DELETE_INSTRUMENT,
      id: 1
    });
    
    expect(state).to.deep.equal([{
      id: 0,
      type: "drumMachine",
      machineId: 0,
      selected: true
    }]);
  });
  
  it("changes instrument name", () => {
    let _instruments = [{
      id: 0,
      name: "test name"
    },{
      id: 1
    }];

    let state = instruments(_instruments, {
      type: CHANGE_INSTRUMENT_NAME,
      id: 1,
      name: "another name"
    });
    
    expect(state[1]).to.deep.equal({
      id: 1,
      name: "another name"
    });
  });
});