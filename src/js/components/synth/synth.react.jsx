import React, { Component } from "react";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

let Synth = props => {
  return <div className="synth-machine">
    <div className="oscillator">
      <h3>Oscillator 1</h3>
      <Slider name="Octave" min={0} max={7} step={1} value={0} onValueChange={ value => false } />
      <Slider name="Semitone" min={0} max={11} step={1} value={0} onValueChange={ value => false } />
      <Slider name="Cent" min={0} max={100} step={1} value={0} onValueChange={ value => false } />
      <Rotator name="Velocity" value={0} onValueChange={ value => false } />
    </div>
  </div>
};

export { Synth };