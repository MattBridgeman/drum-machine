import React, { Component } from "react";

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
        <button className="modal-button open-button" onClick={() => this.onOpen()}>
          <span className="assistive">Open Modal</span>
          {
            props.icon ? 
            (<span className={"icon__" + props.icon}></span>)
            : null
          }
        </button>
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
                { props.children }
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
};

export { Modal };