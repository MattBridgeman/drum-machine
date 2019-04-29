import React, { PureComponent } from "react";
import { DefaultInput } from "../input/input.react";

class InstrumentTitle extends PureComponent {
  render(){
    return <div className="instrument-title">
      <h2 className="title">Instruments
        <span className="icon__arrow-right"></span>
      </h2>
      <DefaultInput value="hello" />
    </div>;
  }
};

export { InstrumentTitle };