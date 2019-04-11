import React, { PureComponent, Children, cloneElement } from "react";
import classnames from 'classnames';

const GRID_SIZE_DEFAULT = 35;

class GridContainer extends PureComponent {
  state={
    containerWidth: ''
  }
  calculateContainerWidth = () => {
		let { grid: $grid } = this.refs;

    this.setState({
      containerWidth: $grid.getBoundingClientRect().width
    });
  }
  componentDidMount() {
    this.calculateContainerWidth();
    window.addEventListener("resize", this.calculateContainerWidth);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateContainerWidth);
  }
  render() {
    let { children, types } = this.props;
    let { containerWidth } = this.state;
    return <div className={classnames("grid-container", ...types)} ref="grid">{
      Children.map(children, child => {
        return cloneElement(child, {
          ...child.props,
          max: {
            columns: Math.floor(containerWidth / GRID_SIZE_DEFAULT) - 1,
            rows: Math.floor(containerWidth / GRID_SIZE_DEFAULT) - 1
          },
          offset: {
            column: 0,
            row: 0
          }
        });
      })
    }</div>;
  }
};

let GridAxis = props => {
  let { children, type, max: { columns = 0, rows = 0 }, offset: { column = 0, row = 0 } } = props;
  return <div className={classnames("grid-axis", { [`grid-axis-${type}`]: type })}>{
    columns || rows ? children.filter((child, i) => 
      type === "x" ?
        i >= column && i < columns + column :
        i >= row && i < rows + row
    ) : children
  }</div>;
};

let GridAxisItem = props => {
  let { children } = props;
  return <div className="grid-axis-item">{children}</div>;
};

let Grid = props => {
  let { children, max, max: { rows = 0 }, offset, offset: { row = 0 } } = props;
  return <div className="grid">{
    Children.map(children, (child, i) => {
      if(rows && i >= row && i < rows + row) {
        return cloneElement(child, {
          ...child.props,
          max,
          offset
        });
      }
      return null;
    })
  }</div>;
};

let GridRow = props => {
  let { children, type, max: { columns = 0 }, offset: { column = 0 } } = props;
  return <div className={classnames("grid-row", { [`grid-row-${type}`]: type })}>{
    columns ? children.filter((child, i) => i >= column && i < columns + column) : children
  }</div>;
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