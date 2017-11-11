import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";

export let Header = (props) => {
  const { dispatch } = props;
  const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
  return <div className="header">
    <div className="logo">
      <h1><NavLink to="/" activeClassName="active">Drum Machine</NavLink></h1>
    </div>
    {
      props.auth.user ?
      (
        <div className="tray">
          <button className="header-link" onClick={() => trackActions.saveTrack()}>Save Track</button>
          <NavLink to="/user/logout" className="header-link" activeClassName="active">Logout</NavLink>
        </div>
      ) : (
        <div className="tray">
          <NavLink to="/user/login" className="header-link" activeClassName="active">Login</NavLink>
        </div>
      )
    }
  </div>
};