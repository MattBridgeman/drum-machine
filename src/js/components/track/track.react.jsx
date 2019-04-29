import React, { PureComponent } from "react";
import { Instrument } from "../instrument/instrument.react.jsx";
import { InstrumentTitle } from "../instrument-title/instrument.title.react.jsx";
import { PlayBar } from "../play-bar/playbar.react.jsx";

class Track extends PureComponent {
  render(){
    let { props } = this;
    return <div>
      <PlayBar {...props} />
      <div className="container">
        <InstrumentTitle {...props} />
        <Instrument {...props} />
      </div>
    </div>;
  }
};

export { Track };