import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

const NOTIFICATION_TIMEOUT = 5000;
const TRANSITION_TIME = 300;

export class Notifications extends Component {

	constructor(props) {
		super(props);
    this.state = {
      open: true
    };
  }
  
  render(){
    let { open } = this.state;
    let { notifications } = this.props;
    let notification =  notifications[0];
    let showHideClass = open && !!notification ? "show" : "hide";
    return <div className={"notification " + showHideClass}>
      { notification ? notification.value : "" }
      <button className="close" onClick={() => this.closeNotification(notification.id)}>
        <span className="assistive">Close notification</span> X
      </button>
    </div>
  }

  componentWillReceiveProps(nextProps){
    let { notifications } = this.props;
    let newNotifications = nextProps.notifications;
    let oldNotification = notifications[0];
    let newNotification = newNotifications[0];
    if(newNotification && oldNotification !== newNotification) {
      this.setState({
        open: true
      });
      if(newNotification.notificationType === "timeout"){
        this.setExpiryTimout(newNotification.id);
      }
    }
  }

  closeNotification(id) {
    this.setState({
      open: false
    });
    this.deleteNotification(id);
  }

  setExpiryTimout(id) {
    setTimeout(() => this.closeNotification(id), NOTIFICATION_TIMEOUT);
  }

  deleteNotification(id) {
    setTimeout(() => {
      let { dispatch } = this.props;
      const notificationsActions = bindActionCreators(DrumMachineActions.notifications, dispatch);
      notificationsActions.clearNotification(id);
    }, TRANSITION_TIME);
  }
}