import React, { Component } from "react";
import { Link } from "react-router-dom";

export let Header = (props) => <div className="header">
  <Link to="/">Drum Machine</Link>
  {
    props.auth.user ?
    (
      <div className="tray">
        <Link to="/track/save">Save Track</Link>
        <Link to="/user/logout">Logout</Link>
      </div>
    ) : (
      <div className="tray">
        <Link to="/user/login">Login</Link>
        <Link to="/user/signup">Sign Up</Link>
      </div>
    )
  }
</div>;