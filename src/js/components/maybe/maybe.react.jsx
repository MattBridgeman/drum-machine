import React, { Component } from "react";

let Maybe = props => props.condition ? props.children : null;

export { Maybe };