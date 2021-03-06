import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { uiConfig } from "../../library/firebase/config";
import { init } from "../../library/firebase/firebase";
import DrumMachineActions from "../../actions/root.actions";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

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
    init()
    .then(() => {
      ui = ui || new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebase-auth', {
        ...uiConfig(),
        callbacks: {
          signInSuccess: (user) => {
            let { dispatch } = this.props;
            const notificationsActions = bindActionCreators(DrumMachineActions.notifications, dispatch);
            notificationsActions.newNotification("Login successful!");
            this.setState({
              signedIn: true
            });
          }        
        }
      });
    });
  }
}

export { Auth };