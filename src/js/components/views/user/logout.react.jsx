import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "../view.react.jsx";
import { Logout } from "../../firebase/logout.react.jsx"

let _Logout = (props) => 
  <View {...props} view={{ name: "logout" }}>
    <div className="container">
      <Logout {...props} />
    </div>
  </View>;

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(_Logout);