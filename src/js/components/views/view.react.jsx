import React, { Component } from "react";
import { Header } from "../header/header.react.jsx";
import { Notifications } from "../notifications/notifications.react.jsx";

let View = (props) =>
  <div className={"view " + props.view.name}>
    <Header {...props} />
    {props.children}
    <Notifications {...props} />
  </div>;

export { View };