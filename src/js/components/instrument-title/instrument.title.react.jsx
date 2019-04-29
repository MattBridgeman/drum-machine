import React, { PureComponent } from "react";
import { DefaultInput } from "../input/input.react";
import { getInstrumentTitle } from "../../library/utils/instrument";

class InstrumentTitle extends PureComponent {
  render(){
    let { instruments } = this.props;
    let selectedInstruments = instruments.filter(item => item.selected);
    let instrument = selectedInstruments[0];
    let value = "";
    if(instrument) {
      value = getInstrumentTitle(instrument);
    }
    return <div className="instrument-title">
      <h2 className="title">Instruments
        <span className="icon__arrow-right"></span>
      </h2>
      <DefaultInput value={value} />
    </div>;
  }
};

export { InstrumentTitle };