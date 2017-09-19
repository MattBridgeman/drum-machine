import React, { Component } from "react";
import { Link } from "react-router-dom";

export let Header = (props) => <div className="header">
  <Link to="/">Drum Machine</Link>
  <Link to="/user/login">Login</Link>
  <Link to="/user/signup">Sign Up</Link>
</div>;