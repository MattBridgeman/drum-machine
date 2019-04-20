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
  it("changes the oscilator amount", () => {
    let action = changeSynthParam(0, "osc2", "amount", 3);
    let state = synth(undefined, action);
    expect(state[0].oscillators.osc2.amount).to.equal(3);
  });
  it("changes the voices", () => {
    let action = changeSynthParam(0, "voices", null, 7);
    let state = synth(undefined, action);
    expect(state[0].voices).to.equal(7);
  });
  it("changes the volume", () => {
    let action = changeSynthParam(0, "volume", null, 7);
    let state = synth(undefined, action);
    expect(state[0].volume).to.equal(7);
  });
  it("changes the pan", () => {
    let action = changeSynthParam(0, "pan", null, 7);
    let state = synth(undefined, action);
    expect(state[0].pan).to.equal(7);
  });
  it("changes the send1", () => {
    let action = changeSynthParam(0, "sends", "send1", 7);
    let state = synth(undefined, action);
    expect(state[0].sends.send1).to.equal(7);
  });
  it("changes the send2", () => {
    let action = changeSynthParam(0, "sends", "send2", 7);
    let state = synth(undefined, action);
    expect(state[0].sends.send2).to.equal(7);
  });
  it("changes the filter frequency", () => {
    let action = changeSynthParam(0, "filter", "frequency", 7);
    let state = synth(undefined, action);
    expect(state[0].filter.frequency).to.equal(7);
  });
  it("changes the filter resonance", () => {
    let action = changeSynthParam(0, "filter", "resonance", 7);
    let state = synth(undefined, action);
    expect(state[0].filter.resonance).to.equal(7);
  });
  it("changes the lfo rate", () => {
    let action = changeSynthParam(0, "lfo1", "rate", 7);
    let state = synth(undefined, action);
    expect(state[0].lfos.lfo1.rate).to.equal(7);
  });
  it("changes the lfo amount", () => {
    let action = changeSynthParam(0, "lfo1", "amount", 7);
    let state = synth(undefined, action);
    expect(state[0].lfos.lfo1.amount).to.equal(7);
  });
  it("changes the lfo type", () => {
    let action = changeSynthParam(0, "lfo1", "waveType", "square");
    let state = synth(undefined, action);
    expect(state[0].lfos.lfo1.waveType).to.equal("square");
  });
  it("changes the lfo destination", () => {
    let action = changeSynthParam(0, "lfo1", "destination", "ffreq");
    let state = synth(undefined, action);
    expect(state[0].lfos.lfo1.destination).to.equal("ffreq");
  });
  it("changes the env amp attack", () => {
    let action = changeSynthParam(0, "amp", "attack", 13);
    let state = synth(undefined, action);
    expect(state[0].envelopes.amp.attack).to.equal(13);
  });
  it("changes the env filter attack", () => {
    let action = changeSynthParam(0, "env-filter", "attack", 13);
    let state = synth(undefined, action);
    expect(state[0].envelopes.filter.attack).to.equal(13);
  });
  it("doesn't change a random param", () => {
    let action = changeSynthParam(0, "random", "attack", 13);
    let state = synth(undefined, action);
    expect(state[0].envelopes.filter.attack).to.equal(0);
  });
});