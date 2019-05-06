import React, { PureComponent } from "react";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";
import { Synth } from "../synth/synth.react.jsx";
import classnames from "classnames";
import { SELECTABLE_INSTRUMENTS, INSTRUMENTS_MAP } from "../../constants/instruments.constants.js";

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
    const { instruments, onChange, onDelete, onNewInstrument } = this.props;
    let selectableInstruments = instruments.filter(({ type }) => SELECTABLE_INSTRUMENTS.includes(type));
    return <div>
      <ul className="instrument-selector">
        {selectableInstruments.map(({ type, id, machineId, selected, name }, index) => {
          return <li key={id}>
            <button className={classnames("button select-instrument-button", INSTRUMENTS_MAP[type].className, { selected })} onClick={() => {
                onChange(id, type, machineId, index);
              }}>
              <span className={`icon__icon-${INSTRUMENTS_MAP[type].className}`}></span>
              {name || INSTRUMENTS_MAP[type].friendlyName}
            </button>

            <button className={classnames("button delete-instrument-button", INSTRUMENTS_MAP[type].className)} onClick={() => {
              onDelete(id, type, machineId, index);
            }}>
              <span className="icon icon__close"></span>
            </button>
          </li>
        })}
        <li><AddInstrument onNewInstrument={onNewInstrument} totalInstruments={selectableInstruments.length} /></li>
      </ul>
    </div>;
  }
};

class AddInstrument extends PureComponent {
  state={
    open: false
  }

  onToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render(){
    const { onNewInstrument, totalInstruments } = this.props;
    return <div className={classnames("add-instrument", `total-instruments-${totalInstruments}`)}>
      <button className="button add-instrument-trigger" onClick={() => this.onToggle()}>
        <span className="icon__plus"></span>
        Add New Instrument
      </button>
      <ul className={classnames({ open: this.state.open })}>
        {SELECTABLE_INSTRUMENTS.map((type, index) => 
          <li key={index}><button className="button add-instrument-button" onClick={() => {
            this.onToggle();
            onNewInstrument(type);
          }}>Add {INSTRUMENTS_MAP[type].friendlyName}</button></li>
        )}
      </ul>
    </div>;
  }
};

export { Instrument, InstrumentSelector, AddInstrument };