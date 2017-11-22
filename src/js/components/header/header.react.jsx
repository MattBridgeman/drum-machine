import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { Input } from "../input/input";

export let Header = (props) => {
  const { dispatch } = props;
  const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
  const metaActions = bindActionCreators(DrumMachineActions.meta, dispatch);
  return <div className="header">
    <div className="tray">
      <div className="logo">
        <h1><NavLink to="/" activeClassName="active icon__logo"><span className="assistive">Drum Machine</span></NavLink></h1>
      </div>
      <Input value={props.meta.title} onValueChange={value => metaActions.changeTrackTitle(value)} />
    </div>
    {
      props.auth.user ?
      (
        <div className="tray">
          {
            props.track.write ?
            (
              <button className="header-link" onClick={() => trackActions.saveTrack()}>Save<span className="assistive"> Track</span></button>
            ) : null
          }
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