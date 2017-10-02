import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "../view.react.jsx";
import { Auth } from "../../firebase/auth.react.jsx"

let Login = (props) => 
  <View {...props} view={{ name: "login" }}>
    <div className="container">
      <h2>Log In</h2>
      <p>The ability to save tracks is coming very soon. For now log in or register.</p>
      <Auth {...props} />
    </div>
  </View>;

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(Login);