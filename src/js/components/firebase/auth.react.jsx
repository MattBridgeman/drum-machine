import React, { Component } from "react";
import firebaseui from "firebaseui";
import firebase from "firebase";
import { uiConfig } from "../../library/firebase/config";

let ui;

class Auth extends Component {
  render(){
    return <div id="firebase-auth"></div>
  }
  componentDidMount(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    ui = ui || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebase-auth', {
      ...uiConfig,
      signInSuccessUrl: from.pathname
    });
  }
}

export { Auth };