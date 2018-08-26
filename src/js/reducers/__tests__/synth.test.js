import { expect } from "chai";
import synth from "../synth.reducer";
import { changeSynthParam } from "../../actions/synth.actions";

describe("Synth reducer", () => {
  it("returns default synth state", () => {
    let action = {
      type: "RANDOM"
    };
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc1.waveType).to.equal("sine");
  });
  it("changes the oscilator wave type", () => {
    let action = changeSynthParam(0, "osc1", "waveType", "square");
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc1.waveType).to.equal("square");
  });
});