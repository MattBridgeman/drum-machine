import React, { PureComponent } from "react";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";
import { Synth } from "../synth/synth.react.jsx";

const SELECTABLE_INSTRUMENTS = [
  "drumMachine",
  "synth"
];

const INSTRUMENTS_MAP = {
  drumMachine: {
    friendlyName: "Drum Machine"
  },
  synth: {
    friendlyName: "Synth"
  }
};

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
    const { instruments, onChange, onNewInstrument } = this.props;
    let selectableInstruments = instruments.filter(({ type }) => SELECTABLE_INSTRUMENTS.includes(type));
    return <div>
      <ul className="instrument-selector">
        {selectableInstruments.map(({ type, id, machineId }, index) => {
          return <li><button className="button" onClick={() => {
            onChange(id, type, machineId, index);
          }}>{type}</button></li>
        })}
        <li><AddInstrument onNewInstrument={onNewInstrument} /></li>
      </ul>
    </div>;
  }
};

class AddInstrument extends PureComponent {
  render(){
    const { onNewInstrument } = this.props;
    return <div className="add-instrument">
      <ul>
        {SELECTABLE_INSTRUMENTS.map(type => 
          <li><button className="button add-instrument-button" onClick={() => {
            onNewInstrument(type);
          }}>Add {INSTRUMENTS_MAP[type].friendlyName}</button></li>
        )}
      </ul>
    </div>;
  }
};

export { Instrument, InstrumentSelector };