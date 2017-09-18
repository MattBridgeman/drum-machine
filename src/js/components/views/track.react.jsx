import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "./view.react.jsx";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";

let Track = (props) =>
  <View {...props}>
    <div className="container">
      <DrumMachine {...props} />
    </div>
  </View>;

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(Track);