import React, { Component } from "react";
import { Header } from "../header/header.react.jsx";

let View = (props) =>
  <div className={"view " + props.view.name}>
    <Header {...props} />
    {props.children}
  </div>;

export { View };