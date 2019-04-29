import { expect } from "chai";
import synth from "../synth.reducer";
import { changeSynthParam } from "../../actions/synth.actions";
import { deleteInstrument, onNewInstrument } from "../../actions/instruments.actions";
import { ON_NEW_INSTRUMENT } from "../../constants/instruments.constants";
import { LOAD_DEFAULT_TRACK, NEW_TRACK_LOADING, NEW_TRACK_LOADED } from "../../constants/track.constants";

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
  it("changes the pattern item", () => {
    let action = changeSynthParam(0, "pattern-item", "0.0", 1);
    let state = synth({
      0: {
        banks: {
          0: [-1]
        }
      }
    }, action);
    expect(state[0].banks[0][0]).to.equal(1);
  });
  it("doesn't change a random param", () => {
    let action = changeSynthParam(0, "random", "attack", 13);
    let state = synth(undefined, action);
    expect(state[0].envelopes.filter.attack).to.equal(0);
  });
  it("loads initial track state", () => {
    let action = {
      type: NEW_TRACK_LOADING
    };
    let state = synth(undefined, action);
    expect(state).to.deep.equal({});
  });
  it("loads state from track", () => {
    let _synth = {};
    let action = {
      type: NEW_TRACK_LOADED,
      synth: _synth
    };
    let state = synth(undefined, action);
    expect(state).to.equal(action.synth);
  });
  it("loads default state if no synth in track", () => {
    let action = {
      type: NEW_TRACK_LOADED
    };
    let state = synth(undefined, action);
    expect(state).to.be.an("object");
  });
  it("loads default track state", () => {
    let action = {
      type: LOAD_DEFAULT_TRACK
    };
    let state = synth(undefined, action);
    expect(state).to.be.an("object");
  });
  it("deletes the synth", () => {
    let action = {
      type: ON_NEW_INSTRUMENT,
      machineId: 1,
      instrumentType: "synth"
    };
    let state = synth({
      0: {
        volume: 50,
        pan: 50,
        currentBankIndex: 0
      }
    }, action);
    expect(state[1]).to.be.an("object");
  });
  it("does nothing if not a synth", () => {
    let action = {
      type: ON_NEW_INSTRUMENT,
      machineId: 1,
      instrumentType: "drumMachine"
    };
    let _synth = {
      0: {
        volume: 50,
        pan: 50,
        currentBankIndex: 0
      }
    };
    let state = synth(_synth, action);
    expect(state).to.equal(_synth);
  });
  it("deletes the synth", () => {
    let action = deleteInstrument(1, "synth", 0, 0);
    let state = synth({
      0: {
        volume: 50,
        pan: 50,
        currentBankIndex: 0
      }
    }, action);
    expect(state).to.deep.equal({});
  });
  it("does nothing if not a synth", () => {
    let action = deleteInstrument(1, "drumMachine", 0, 0);
    let state = synth({
      0: {
        volume: 50,
        pan: 50,
        currentBankIndex: 0
      }
    }, action);
    expect(state).to.deep.equal({
      0: {
        volume: 50,
        pan: 50,
        currentBankIndex: 0
      }
    });
  });
});