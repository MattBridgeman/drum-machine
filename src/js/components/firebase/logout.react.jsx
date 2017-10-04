import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { auth } from "../../library/firebase/auth";
import DrumMachineActions from "../../actions/drum.machine.actions";

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
    auth
      .load()
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