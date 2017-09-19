import React, { Component } from "react";

export class Notifications extends Component {

	constructor(props) {
		super(props);
    this.state = {
      notification: undefined,
      expired: false,
      closed: true
    };
  }
  
  render(){
    let { notification, expired, closed } = this.state;
    let showHideClass = expired || closed ? "hide" : "show";
    return notification ? 
    (
      <div className={"notification " + showHideClass}>
        { notification.value }
        <button className="close" onClick={() => this.closeNotification(notification.id)}>Close notification</button>
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
          expired: false,
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
  }

  setExpiryTimout(id) {
    setTimeout(() => this.closeNotification(id));
  }
}