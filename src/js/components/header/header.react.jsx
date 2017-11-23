import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { DefaultInput } from "../input/input.react.jsx";

class DropDownMenu extends Component {
  render(){
    let { props, state } = this;
    let { open } = state;
    return <div className="dropdown-menu">
      <button className={"dropdown-menu-trigger icon__menu " + open ? "icon__menu-hover" : ""}>
        <span className="assistive">
          { open ? "Close Menu" : "Open Menu"}
        </span>
      </button>
      <div className="dropdown-menu-panel">
        {
          props.auth.user && props.track.write ?
            (
              <button className="header-link" onClick={() => trackActions.saveTrack()}>Save<span className="assistive"> Track</span></button>
            ) : null
          <NavLink to="/user/logout" className="header-link" activeClassName="active">Logout</NavLink>
          ) : (
            <div className="tray">
              <NavLink to="/user/login" className="header-link" activeClassName="active">Login</NavLink>
            </div>
          )
        }
      </div>
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