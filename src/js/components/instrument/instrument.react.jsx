import React, { Component } from "react";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";

class InstrumentSelector extends Component {
  render(){
    const { instruments } = this.props;
    let instrument = instruments.filter(item => item.selected);

    switch(instrument.type){
      case "drumMachine":
        return <DrumMachine {...this.props} machineId={machineId} />
      default:
        return null;
    }
  }
};

export { InstrumentSelector };