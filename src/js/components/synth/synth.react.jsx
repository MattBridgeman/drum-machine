import React, { Component } from "react";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

let Synth = props => {
  return <div className="synth-machine">
    <div className="oscillator-container">
      <div className="oscillator">
        <h3>Oscillator 1</h3>
        <div className="oscillator-controls">
          <div className="radio-slider">
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
            Square
          </div>
          <Slider name="Octave" min={0} max={7} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Semitone" min={0} max={11} step={1} value={0} onValueChange={ value => false } />
          <Slider name="Cent" min={0} max={100} step={1} value={0} onValueChange={ value => false } />
          <Rotator name="Velocity" value={0} onValueChange={ value => false } />
        </div>
      </div>
    </div>
    <div className="envelopes">
      <div className="envelope">
        <h3>Amp Envelope</h3>

      </div>
    </div>
  </div>
};

export { Synth };