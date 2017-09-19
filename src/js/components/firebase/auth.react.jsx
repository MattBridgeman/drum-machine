import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebaseui from "firebaseui";
import firebase from "firebase";
import { uiConfig } from "../../library/firebase/config";

let ui;

class Auth extends Component {
  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return !this.props.auth.user ? 
      (<div id="firebase-auth"></div>)
      :
      (<Redirect to={from} />)
  }
  componentDidMount(){
    if(this.props.auth.user) return;
    ui = ui || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebase-auth', {
      ...uiConfig,
      callbacks: {
        signInSuccess: (user) => this.setState({
          signedIn: true
        })
      }
    });
  }
}

export { Auth };