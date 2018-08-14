import { expect } from "chai";
import synth from "../synth.reducer";
import { changeSynthParam } from "../../actions/synth.actions";

describe("Synth reducer", () => {
  it("returns default synth state", () => {
    let action = {
      type: "RANDOM"
    };
    let state = samples(undefined, action);
    expect(state[0].oscilators.osc1.waveType).to.equal("sine");
  });
});