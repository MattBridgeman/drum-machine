import React, { Component } from "react";
import { Maybe } from "../maybe/maybe.react.jsx";

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
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
      <div className={"modal-container" + ( state.open ? " open" : "" )}>
        <Maybe condition={!props.trigger}>
          <button className="modal-button open-button" onClick={() => this.onOpen()}>
            Open Modal
          </button>
        </Maybe>
        <Maybe condition={props.trigger}>
          {props.trigger({
            onOpen: () => this.onOpen()
          })}
        </Maybe>
        <div className="model-overlay"></div>
        {
          state.open ? (
            <div className="modal">
              <div className="modal-title">
                <h3>{props.title}</h3>
                <button className="modal-button close-button" onClick={() => this.onClose()}>
                  <span className="assistive">Close Modal</span>
                  <span className="icon__close"></span>
                </button>
              </div>
              <div className="modal-body">
                { props.children({
                  onClose: () => this.onClose()
                }) }
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
};

export { Modal };