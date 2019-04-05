import React from "react";
import classnames from 'classnames';

let GridContainer = props => {
  let { children, types } = props;
  return <div className={classnames("grid-container", ...types)}>{children}</div>;
};

let GridAxis = props => {
  let { children, type } = props;
  return <div className={classnames("grid-axis", { [`grid-axis-${type}`]: type })}>{children}</div>;
};

let GridAxisItem = props => {
  let { children } = props;
  return <div className="grid-axis-item">{children}</div>;
};

let Grid = props => {
  let { children } = props;
  return <div className="grid">{children}</div>;
};

let GridRow = props => {
  let { children } = props;
  return <div className="grid-row">{children}</div>;
};

let GridItem = props => {
  let { children } = props;
  return <div className="grid-item">{children}</div>;
};

export {
  GridContainer,
  GridAxis,
  GridAxisItem,
  Grid,
  GridRow,
  GridItem
};