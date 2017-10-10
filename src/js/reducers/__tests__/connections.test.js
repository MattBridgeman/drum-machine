import { expect } from "chai";
import connections from "../connections.reducer";

describe("Connections reducer", () => {
	it("returns the default connections state", () => {
    let nextState = connections();
    expect(nextState[0].id).to.equal(0);
    expect(nextState[0].from.machineId).to.equal(0);
    expect(nextState[0].from.type).to.equal("drumMachine");
  });
});