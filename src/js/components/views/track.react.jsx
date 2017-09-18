import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../header/header.react.jsx";
import { DrumMachine } from "../drum-machine/drum.machine.react.jsx";

let Track = (props) =>
  <div className="view track">
    <Header {...props} />
    <div className="container">
      <DrumMachine {...props} />
    </div>
  </div>;

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(Track);