import React, { Component } from "react";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";
import { Synth } from "../synth/synth.react.jsx";

class Instrument extends Component {
  render(){
    const { instruments } = this.props;
    let selectedInstruments = instruments.filter(item => item.selected);
    let instrument = selectedInstruments[0];
    if(instrument) {
      let { type, machineId } = instrument;
      switch(type){
        case "drumMachine":
          return <DrumMachine {...this.props} machineId={machineId} />
        case "synth":
          return <Synth {...this.props} />
        default:
          return null;
      }
    }
    return null;
  }
};

export { Instrument };