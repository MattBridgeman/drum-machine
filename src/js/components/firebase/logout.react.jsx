import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { init } from "../../library/firebase/firebase";
import DrumMachineActions from "../../actions/root.actions";
import firebase from "firebase";
import firebaseui from "firebaseui";

class Logout extends Component {
  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return !this.props.auth.user ? (
      <Redirect to={from} />
    ) : (
      <div className="signout">
        <p>Logging out...</p>
      </div>
    );
  }
  componentDidMount(){
    if(!this.props.auth.user) return;
    init()
    .then(() => {
      firebase.auth().signOut()
        .then(() => {
          let { dispatch } = this.props;
          const notificationsActions = bindActionCreators(DrumMachineActions.notifications, dispatch);
          notificationsActions.newNotification("Logout successful");
          this.setState({
            signedIn: false
          });
        }
      );
    });
  }
}

export { Logout };