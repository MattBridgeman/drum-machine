import React, { Component } from "react";
import { bindActionCreators } from "redux";
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
  
    render(){
      let { props, state } = this;
      let { open } = state;
      return <div className="dropdown-menu">
        <button onClick={() => this.onOpen()} className={"dropdown-menu-trigger icon__menu " + (open ? "icon__menu-hover" : "")}>
          <span className="assistive">
            { open ? "Close Menu" : "Open Menu"}
          </span>
        </button>
        <div className={"dropdown-menu-panel-overlay " + (open ? "show" : "")}></div>
        {
          props.auth.user ? (
            <div className="dropdown-menu-panel">
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