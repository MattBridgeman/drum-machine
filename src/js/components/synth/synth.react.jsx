import React, { Component } from "react";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

let Synth = props => {
  return <div className="synth-machine">
    <div className="basic-controls">
      <Slider name="Voices" min={1} max={8} step={1} value={1} onValueChange={ value => false } />
      <Rotator name="Volume" value={0} onValueChange={ value => false } />
      <Rotator name="Pan" value={0} onValueChange={ value => false } />
    </div>
    <div className="oscillator-container">
      <div className="oscillator">
        <h3>Oscillator 1</h3>
        <div className="oscillator-controls">
          <div className="radio-slider">
            <h3 className="item-label">Type</h3>
            Sine
          </div>
          <Slider name="Octave" min={0} max={7} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Semitone" min={0} max={11} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Cent" min={0} max={100} step={1} value={0} onValueChange={ value => false } />
          <Rotator name="Velocity" value={0} onValueChange={ value => false } />
        </div>
      </div>
      <div className="oscillator">
        <h3>Oscillator 2</h3>
        <div className="oscillator-controls">
          <div className="radio-slider">
            <h3 className="item-label">Type</h3>
            Square
          </div>
          <Slider name="Octave" min={0} max={7} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Semitone" min={0} max={11} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Cent" min={0} max={100} step={1} value={0} onValueChange={ value => false } />
          <Rotator name="Velocity" value={0} onValueChange={ value => false } />
        </div>
      </div>
    </div>
    <div className="filter">
      <h3>Filter</h3>
      <div className="vertical-range">
        <label htmlFor="filter-frequency" className="item-label">Frequency</label>
        <input id="filter-frequency" type="range" min="0" max="100" value="0" step="1" />
      </div>
      <div className="vertical-range">
        <label htmlFor="filter-resonance" className="item-label">Resonance</label>
        <input id="filter-resonance" type="range" min="0" max="100" value="0" step="1" />
      </div>
    </div>
    <div className="envelopes">
      <div className="envelope">
        <h3>Amp Envelope</h3>
        <div className="envelope-controls">
          <div className="vertical-range">
            <label htmlFor="amp-attack" className="item-label">Attack</label>
            <input id="amp-attack" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-decay" className="item-label">Decay</label>
            <input id="amp-decay" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-sustain" className="item-label">Sustain</label>
            <input id="amp-sustain" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="amp-release" className="item-label">Release</label>
            <input id="amp-release" type="range" min="0" max="100" value="0" step="1" />
          </div>
        </div>
      </div>
      <div className="envelope">
        <h3>Filter Envelope</h3>
        <div className="envelope-controls">
          <div className="vertical-range">
            <label htmlFor="filter-attack" className="item-label">Attack</label>
            <input id="filter-attack" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-decay" className="item-label">Decay</label>
            <input id="filter-decay" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-sustain" className="item-label">Sustain</label>
            <input id="filter-sustain" type="range" min="0" max="100" value="0" step="1" />
          </div>
          <div className="vertical-range">
            <label htmlFor="filter-release" className="item-label">Release</label>
            <input id="filter-release" type="range" min="0" max="100" value="0" step="1" />
          </div>
        </div>
      </div>

    </div>
  </div>
};

export { Synth };