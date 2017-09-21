import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

const NOTIFICATION_TIMEOUT = 5000;
const TRANSITION_TIME = 300;

export class Notifications extends Component {

	constructor(props) {
		super(props);
    this.state = {
      notification: undefined,
      closed: true
    };
  }
  
  render(){
    let { notification, closed } = this.state;
    let showHideClass = closed ? "hide" : "show";
    return notification ? 
    (
      <div className={"notification " + showHideClass}>
        { notification.value }
        <button className="close" onClick={() => this.closeNotification(notification.id)}>
          <span className="assistive">Close notification</span> X
        </button>
      </div>
    ) : null
  }

  componentWillReceiveProps(){
    let { notifications } = this.props;
    let notification = notifications[0];
    if(notification
      && !(this.state.notification
      && notification.id === this.state.notification)) {
        this.setState({
          notification,
          closed: false
        });
        if(notification.notificationType === "timeout"){
          this.setExpiryTimout(notification.id);
        }
      }
  }

  closeNotification(id) {
    if(this.state.notification && id === this.state.notification.id) {
      this.setState({
        closed: true
      });
    }
    this.deleteNotification(id);
  }

  setExpiryTimout(id) {
    setTimeout(() => this.closeNotification(id), NOTIFICATION_TIMEOUT);
  }

  deleteNotification(id) {
    setTimeout(() => {
      if(this.state.notification && id === this.state.notification.id) {
        let { dispatch } = this.props;
        const notificationsActions = bindActionCreators(DrumMachineActions.notifications, dispatch);
        notificationsActions.clearNotification(id);
      }
    }, TRANSITION_TIME);
  }
}