import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export let Header = (props) => <div className="header">
  <div className="logo">
    <h1><NavLink to="/" activeClassName="active">Drum Machine</NavLink></h1>
  </div>
  {
    props.auth.user ?
    (
      <div className="tray">
        <NavLink to="/user/logout" className="header-link" activeClassName="active">Logout</NavLink>
      </div>
    ) : (
      <div className="tray">
        <NavLink to="/user/login" className="header-link" activeClassName="active">Login</NavLink>
      </div>
    )
  }
</div>;