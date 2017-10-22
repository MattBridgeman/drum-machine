import { expect } from "chai";
import connections from "../connections.reducer";
import { NEW_TRACK_LOADING } from "../../constants/track.constants";

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
});