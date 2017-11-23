import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { DefaultInput } from "../input/input.react.jsx";

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render(){
    let { props, state } = this;
    let { open } = state;
    return <div className="dropdown-menu">
      <button className={"dropdown-menu-trigger icon__menu " + open ? "icon__menu-hover" : ""}>
        <span className="assistive">
          { open ? "Close Menu" : "Open Menu"}
        </span>
      </button>
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

export let Header = props => {
  const { dispatch } = props;
  const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
  const metaActions = bindActionCreators(DrumMachineActions.meta, dispatch);
  return <div className="header">
    <div className="tray">
      <div className="logo">
        <h1><NavLink to="/" activeClassName="active icon__logo"><span className="assistive">Drum Machine</span></NavLink></h1>
      </div>
      { props.meta.title ?
        (
          <DefaultInput disabled={ !props.track.write } value={props.meta.title} onValueChange={value => metaActions.changeTrackTitle(value)} />
        ) : null
      }
    </div>
    <div className="tray">
      <DropDownMenu {...props}></DropDownMenu>
    </div>
  </div>
};