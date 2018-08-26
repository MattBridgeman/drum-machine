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
  it("changes the oscilator oscillator octave", () => {
    let action = changeSynthParam(0, "osc1", "octave", 2);
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc1.octave).to.equal(2);
  });
  it("changes the oscilator semitone", () => {
    let action = changeSynthParam(0, "osc2", "semitone", 3);
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc2.semitone).to.equal(3);
  });
  it("changes the oscilator cents", () => {
    let action = changeSynthParam(0, "osc2", "cents", 3);
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc2.cents).to.equal(3);
  });
});