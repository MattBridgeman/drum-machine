import React, { PureComponent } from "react";
import { DefaultInput } from "../input/input.react";
import { getInstrumentTitle } from "../../library/utils/instrument";
import DrumMachineActions from "../../actions/root.actions";
import { bindActionCreators } from "redux";

class InstrumentTitle extends PureComponent {
  render(){
    let { instruments, dispatch } = this.props;
    let selectedInstruments = instruments.filter(item => item.selected);
    let instrument = selectedInstruments[0];
    if(!instrument) {
      return null;
    }
    let value = getInstrumentTitle(instrument);
    let instrumentActions = bindActionCreators(DrumMachineActions.instruments, dispatch);
    return <div className="instrument-title">
      <h2 className="title">Instruments
        <span className="icon__arrow-right"></span>
      </h2>
      <DefaultInput value={value} onValueChange={(value) => {
        instrumentActions.changeInstrumentName(instrument.id, value);
      }} />
    </div>;
  }
};

export { InstrumentTitle };