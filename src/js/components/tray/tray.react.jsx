import React, { Component } from "react";
import { Maybe } from "../maybe/maybe.react.jsx";
import classnames from "classnames";

class Tray extends Component {
  state = {
    open: false
  }
  
  onOpen() {
    this.setState({
      open: true
    });
  }
  
  onClose() {
    this.setState({
      open: false
    });
  }

  render() {
    let { props, state } = this;
    return (
      <div className={classnames("tray-container", { open: state.open })}>
        <Maybe condition={!props.trigger}>
          <button className="tray-button open-button" onClick={() => this.onOpen()}>
            Open Tray
          </button>
        </Maybe>
        <Maybe condition={props.trigger}>
          {props.trigger && props.trigger({
            onOpen: () => this.onOpen()
          })}
        </Maybe>
        <div className="tray-overlay" onClick={() => this.onClose()}></div>
        <Maybe condition={state.open}>
          <div className="tray">
            <Maybe condition={props.title}>
              <div className="tray-title">
                <h3>{props.title}</h3>
              </div>
            </Maybe>
            <div className="tray-body">
              { props.children({
                onClose: () => this.onClose()
              }) }
            </div>
          </div>
        </Maybe>
      </div>
    );
  }
};

export { Tray };