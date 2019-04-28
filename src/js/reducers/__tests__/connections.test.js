import { expect } from "chai";
import connections from "../connections.reducer";
import {
  NEW_TRACK_LOADING,
  LOAD_DEFAULT_TRACK,
  NEW_TRACK_LOADED
} from "../../constants/track.constants";
import { ON_NEW_INSTRUMENT, DELETE_INSTRUMENT } from "../../constants/instruments.constants";

describe("Connections reducer", () => {
	it("returns the default connections state", () => {
    let nextState = connections(undefined, {
      type: "SOME_RANDOM_ACTION"
    });
    expect(nextState).to.deep.equal([]);
  });
  it("clears state if new track loading", () => {
    let nextState = connections([{
      id: 0,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }], {
      type: NEW_TRACK_LOADING
    });
    expect(nextState).to.deep.equal([]);
  });
  it("loads the default connections", () => {
    let nextState = connections([], {
      type: LOAD_DEFAULT_TRACK
    });
    expect(nextState[0]).to.deep.equal({
      id: 0,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    });
  });
  it("loads the connections from the new track load", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections([], {
      type: NEW_TRACK_LOADED,
      connections: _connections
    });
    expect(nextState).to.deep.equal(_connections);
  });
  it("adds connection from the instrument to master", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }, {
      id: 1,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/send1"
      },
      to: {
        machineId: 0,
        type: "reverb",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections([], {
      type: ON_NEW_INSTRUMENT,
      instrumentType: "drumMachine",
      machineId: 0
    });
    expect(nextState).to.deep.equal(_connections);
  });
  it("adds connection from synth to master", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 1,
        type: "synth",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections([], {
      type: ON_NEW_INSTRUMENT,
      instrumentType: "synth",
      machineId: 1
    });
    expect(nextState).to.deep.equal(_connections);
  });
  it("removes connection from the instrument", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }, {
      id: 1,
      from: {
        machineId: 0,
        type: "drumMachine",
        nodePath: "outputs/send1"
      },
      to: {
        machineId: 0,
        type: "reverb",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections(_connections, {
      type: DELETE_INSTRUMENT,
      instrumentType: "drumMachine",
      machineId: 0
    });
    expect(nextState).to.deep.equal([]);
  });
  it("removes connection from the synth", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 0,
        type: "synth",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections(_connections, {
      type: DELETE_INSTRUMENT,
      instrumentType: "synth",
      machineId: 0
    });
    expect(nextState).to.deep.equal([]);
  });
  it("leaves connection not related to removal", () => {
    let _connections = [{
      id: 0,
      from: {
        machineId: 0,
        type: "synth",
        nodePath: "outputs/main"
      },
      to: {
        machineId: 0,
        type: "master",
        nodePath: "inputs/main"
      }
    }];
    let nextState = connections(_connections, {
      type: DELETE_INSTRUMENT,
      instrumentType: "drumMachine",
      machineId: 0
    });
    expect(nextState).to.deep.equal(_connections);
  });
});