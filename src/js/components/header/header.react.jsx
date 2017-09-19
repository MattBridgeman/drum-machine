import React, { Component } from "react";
import { Link } from "react-router-dom";

export let Header = (props) => <div className="header">
  <div className="logo">
    <h1><Link to="/">Drum Machine</Link></h1>
  </div>
  {
    props.auth.user ?
    (
      <div className="tray">
        <Link to="/track/save" className="header-link">Save Track</Link>
        <Link to="/user/logout" className="header-link">Logout</Link>
      </div>
    ) : (
      <div className="tray">
        <Link to="/user/login" className="header-link">Login</Link>
        <Link to="/user/signup" className="header-link">Sign Up</Link>
      </div>
    )
  }
</div>;