import React, { PureComponent } from "react";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";
import { Synth } from "../synth/synth.react.jsx";

const SELECTABLE_INSTRUMENTS = [
  "drumMachine",
  "synth"
];

class Instrument extends PureComponent {
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
          return <Synth {...this.props} machineId={machineId} />
        default:
          return null;
      }
    }
    return null;
  }
};

class InstrumentSelector extends PureComponent {
  render(){
    const { instruments, onChange } = this.props;
    let selectableInstruments = instruments.filter(({ type }) => SELECTABLE_INSTRUMENTS.includes(type));
    return <div>
      <ul>
        {selectableInstruments.map(({ type, id, machineId }, index) => {
          return <li><button className="button" onClick={() => {
            onChange(id, type, machineId, index);
          }}>{type}</button></li>
        })}
      </ul>
    </div>;
  }
};

export { Instrument, InstrumentSelector };