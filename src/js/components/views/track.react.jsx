import React, { Component } from "react";
import { connect } from "react-redux";
import { InstrumentSelector } from "../instrument/instrument.react.jsx";
import { View } from "./view.react.jsx";

let Track = (props) =>
  <View {...props} view={{ name: "track" }}>
    <div className="container">
      <InstrumentSelector {...props} />
    </div>
  </View>;

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(Track);