import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import DrumMachineActions from "../../actions/root.actions";

class DropDownMenu extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
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
    
    onToggle() {
      this.setState({
        open: !this.state.open
      });
    }
  
    render(){
      let { props, state } = this;
      let { open } = state;
      return <div className="dropdown-menu">
        <button onClick={() => this.onToggle()} className="dropdown-menu-trigger">
          <span className="icon__menu"></span>
          <span className="icon__menu-hover"></span>
          <span className="assistive">
            { open ? "Close Menu" : "Open Menu"}
          </span>
        </button>
        <div className={"dropdown-menu-panel-overlay " + (open ? "show" : "")} onClick={() => this.onClose()}></div>
        {
          props.auth.user ? (
            <div className={"dropdown-menu-panel " + (open ? "show" : "")}>
              {
                props.track.write ?
                (
                  <button className="dropdown-link" onClick={() => trackActions.saveTrack()}>Save<span className="assistive"> Track</span></button>
                ) : null
              }
              <NavLink to="/user/logout" className="dropdown-link" activeClassName="active">Logout</NavLink>
            </div>
          ) : (
            <div className="dropdown-menu-panel">
              <NavLink to="/user/login" className="dropdown-link" activeClassName="active">Login</NavLink>
            </div>
          )
        }
      </div>
    }
  };

  export { DropDownMenu };