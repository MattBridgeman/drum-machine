import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

let Synth = props => {
  const { synth, machineId, dispatch } = props;
  const synthParams = synth[machineId];
  const synthActions = bindActionCreators(DrumMachineActions.synth, dispatch);
  return <div className="synth-machine">
    <div className="basic-controls">
      <Slider name="Voices" min={1} max={8} step={1} value={synthParams.voices} onValueChange={ value => 
        synthActions.changeSynthParam(machineId, "voices", null, value)
      } />
      <Rotator name="Volume" value={synthParams.volume} onValueChange={ value => 
        synthActions.changeSynthParam(machineId, "volume", null, value)
      } />
      <Rotator name="Pan" value={synthParams.pan} onValueChange={ value => 
        synthActions.changeSynthParam(machineId, "pan", null, value)
      } />
      <Rotator name="Send 1" value={synthParams.sends.send1} onValueChange={ value => 
        synthActions.changeSynthParam(machineId, "sends", "send1", value)
      } />
      <Rotator name="Send 2" value={synthParams.sends.send2} onValueChange={ value => 
        synthActions.changeSynthParam(machineId, "sends", "send2", value)
      } />
    </div>
    <div className="oscillator-container">
      <div className="oscillator">
        <h3>Oscillator 1</h3>
        <div className="oscillator-controls">
          <div className="select-item">
            <h3 className="item-label">Type</h3>
            <select id="osc1-type" onChange={ e =>
              synthActions.changeSynthParam(machineId, "osc1", "waveType", e.target.value)
            }>
              <option value="sine" selected={synthParams.oscillators.osc1.waveType === "sine"}>Sine</option>
              <option value="square" selected={synthParams.oscillators.osc1.waveType === "square"}>Square</option>
              <option value="sawtooth" selected={synthParams.oscillators.osc1.waveType === "sawtooth"}>Sawtooth</option>
              <option value="triangle" selected={synthParams.oscillators.osc1.waveType === "triangle"}>Triangle</option>
            </select>
          </div>
          <Slider name="Octave" min={0} max={7} step={1} value={synthParams.oscillators.osc1.octave} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc1", "octave", value)
          } />
          <Slider name="Semitone" min={0} max={11} step={1} value={synthParams.oscillators.osc1.semitone} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc1", "semitone", value)
          } />
          <Slider name="Cent" min={0} max={100} step={1} value={synthParams.oscillators.osc1.cent} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc1", "cent", value)
          } />
          <Rotator name="Amount" value={synthParams.oscillators.osc1.amount} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc1", "amount", value)
          } />
        </div>
      </div>
      <div className="oscillator">
        <h3>Oscillator 2</h3>
        <div className="oscillator-controls">
          <div className="select-item">
            <h3 className="item-label">Type</h3>
            <select id="osc2-type" onChange={ e =>
              synthActions.changeSynthParam(machineId, "osc2", "waveType", e.target.value)
            }>
              <option value="sine" selected={synthParams.oscillators.osc2.waveType === "sine"}>Sine</option>
              <option value="square" selected={synthParams.oscillators.osc2.waveType === "square"}>Square</option>
              <option value="sawtooth" selected={synthParams.oscillators.osc2.waveType === "sawtooth"}>Sawtooth</option>
              <option value="triangle" selected={synthParams.oscillators.osc2.waveType === "triangle"}>Triangle</option>
            </select>
          </div>
          <Slider name="Octave" min={0} max={7} step={1} value={synthParams.oscillators.osc2.octave} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc2", "octave", value)
          } />
          <Slider name="Semitone" min={0} max={11} step={1} value={synthParams.oscillators.osc2.semitone} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc2", "semitone", value)
          } />
          <Slider name="Cent" min={0} max={100} step={1} value={synthParams.oscillators.osc2.cent} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc2", "cent", value)
          } />
          <Rotator name="Amount" value={synthParams.oscillators.osc2.amount} onValueChange={ value => 
            synthActions.changeSynthParam(machineId, "osc2", "amount", value)
          } />
        </div>
      </div>
    </div>
    <div className="filter">
      <h3>Filter</h3>
      <div className="filter-controls">
        <div className="select-item">
          <h3 className="item-label">Type</h3>
          <select id="filter-type" onChange={ e =>
            synthActions.changeSynthParam(machineId, "filter", "type", e.target.value)
          }>
            <option value="highpass" selected={synthParams.filter.type === "highpass"}>High Pass</option>
            <option value="lowpass" selected={synthParams.filter.type === "lowpass"}>Low Pass</option>
            <option value="bandpass" selected={synthParams.filter.type === "bandpass"}>Band Pass</option>
          </select>
        </div>
        <div className="vertical-range">
          <label htmlFor="filter-frequency" className="item-label">Frequency</label>
          <input id="filter-frequency" type="range" min="0" max="100" value={synthParams.filter.frequency} onChange={ e => 
            synthActions.changeSynthParam(machineId, "filter", "frequency", e.target.value)
          } step="1" />
        </div>
        <div className="vertical-range">
          <label htmlFor="filter-resonance" className="item-label">Resonance</label>
          <input id="filter-resonance" type="range" min="0" max="100" value={synthParams.filter.resonance} onChange={ e => 
            synthActions.changeSynthParam(machineId, "filter", "resonance", e.target.value)
          } step="1" />
        </div>
      </div>
    </div>
    <div className="envelopes">
      <div className="envelope">
        <h3>Amp Envelope</h3>
        <div className="envelope-controls">
          <div className="vertical-range">
            <label htmlFor="amp-attack" className="item-label">Attack</label>
            <input id="amp-attack" type="range" min="0" max="100" value={synthParams.envelopes.amp.attack} onChange={ e => 
              synthActions.changeSynthParam(machineId, "amp", "attack", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-decay" className="item-label">Decay</label>
            <input id="amp-decay" type="range" min="0" max="100" value={synthParams.envelopes.amp.decay} onChange={ e => 
              synthActions.changeSynthParam(machineId, "amp", "decay", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-sustain" className="item-label">Sustain</label>
            <input id="amp-sustain" type="range" min="0" max="100" value={synthParams.envelopes.amp.sustain} onChange={ e => 
              synthActions.changeSynthParam(machineId, "amp", "sustain", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-release" className="item-label">Release</label>
            <input id="amp-release" type="range" min="0" max="100" value={synthParams.envelopes.amp.release} onChange={ e => 
              synthActions.changeSynthParam(machineId, "amp", "release", e.target.value)
            } step="1" />
          </div>
        </div>
      </div>
      <div className="envelope">
        <h3>Filter Envelope</h3>
        <div className="envelope-controls">
          <div className="vertical-range">
            <label htmlFor="filter-attack" className="item-label">Attack</label>
            <input id="filter-attack" type="range" min="0" max="100" value={synthParams.envelopes.filter.attack} onChange={ e => 
              synthActions.changeSynthParam(machineId, "env-filter", "attack", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-decay" className="item-label">Decay</label>
            <input id="filter-decay" type="range" min="0" max="100" value={synthParams.envelopes.filter.decay} onChange={ e => 
              synthActions.changeSynthParam(machineId, "env-filter", "decay", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-sustain" className="item-label">Sustain</label>
            <input id="filter-sustain" type="range" min="0" max="100" value={synthParams.envelopes.filter.sustain} onChange={ e => 
              synthActions.changeSynthParam(machineId, "env-filter", "sustain", e.target.value)
            } step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-release" className="item-label">Release</label>
            <input id="filter-release" type="range" min="0" max="100" value={synthParams.envelopes.filter.release} onChange={ e => 
              synthActions.changeSynthParam(machineId, "env-filter", "release", e.target.value)
            } step="1" />
          </div>
        </div>
      </div>
      <div className="lfo-container">
        <div className="lfo">
          <h3>LFO 1</h3>
          <div className="lfo-controls">
            <Rotator name="Rate" value={synthParams.lfos.lfo1.rate} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo1", "rate", value)
            } />
            <Rotator name="Amount" value={synthParams.lfos.lfo1.amount} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo1", "amount", value)
            } />
            <div className="select-item">
              <h3 className="item-label">Type</h3>
              <select id="lfo1-type" onChange={ e =>
                synthActions.changeSynthParam(machineId, "lfo1", "waveType", e.target.value)
              }>
                <option value="sine" selected={synthParams.lfos.lfo1.waveType === "sine"}>Sine</option>
                <option value="square" selected={synthParams.lfos.lfo1.waveType === "square"}>Square</option>
                <option value="sawtooth" selected={synthParams.lfos.lfo1.waveType === "sawtooth"}>Sawtooth</option>
                <option value="triangle" selected={synthParams.lfos.lfo1.waveType === "triangle"}>Triangle</option>
              </select>
            </div>
            <div className="select-item">
              <h3 className="item-label">Destination</h3>
              <select id="lfo1-destination" onChange={ e =>
                synthActions.changeSynthParam(machineId, "lfo1", "destination", e.target.value)
              }>
                <option value="sine" selected={synthParams.lfos.lfo1.destination === "osc12"}>Oscilator 1,2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="lfo">
          <h3>LFO 2</h3>
          <div className="lfo-controls">
            <Rotator name="Rate" value={synthParams.lfos.lfo2.rate} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo2", "rate", value)
            } />
            <Rotator name="Amount" value={synthParams.lfos.lfo2.amount} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo2", "amount", value)
            } />
            <div className="select-item">
              <h3 className="item-label">Type</h3>
              <select id="lfo2-type" onChange={ e =>
                synthActions.changeSynthParam(machineId, "lfo2", "waveType", e.target.value)
              }>
                <option value="sine" selected={synthParams.lfos.lfo2.waveType === "sine"}>Sine</option>
                <option value="square" selected={synthParams.lfos.lfo2.waveType === "square"}>Square</option>
                <option value="sawtooth" selected={synthParams.lfos.lfo2.waveType === "sawtooth"}>Sawtooth</option>
                <option value="triangle" selected={synthParams.lfos.lfo2.waveType === "triangle"}>Triangle</option>
              </select>
            </div>
            <div className="select-item">
              <h3 className="item-label">Destination</h3>
              <select id="lfo2-destination" onChange={ e =>
                synthActions.changeSynthParam(machineId, "lfo2", "destination", e.target.value)
              }>
                <option value="sine" selected={synthParams.lfos.lfo2.destination === "osc12"}>Oscilator 1,2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export { Synth };