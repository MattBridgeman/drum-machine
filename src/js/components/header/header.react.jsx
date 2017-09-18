import React, { Component } from "react";
import { Link } from "react-router-dom";

export let Header = () => <div className="header">
  Drum Machine
  <Link to="/user/login">Login</Link>
  <Link to="/user/signup">Sign Up</Link>
</div>;