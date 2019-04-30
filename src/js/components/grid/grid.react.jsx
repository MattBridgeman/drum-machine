import React, { PureComponent, Children, cloneElement } from "react";
import classnames from 'classnames';
import { Fader } from "../fader/fader.react";

const GRID_SIZE_DEFAULT = 35;

class GridContainer extends PureComponent {
  state={
    containerWidth: 0,
    containerHeight: 0,
    max: {
      columns: 0,
      rows: 0
    },
    offset: {
      column: 0,
      row: 0
    }
  }
  calculateContainerDimensions = () => {
    let { grid: $grid } = this.refs;
    let { columns, rows } = this.props;

    let dimensions = $grid.getBoundingClientRect();
    let maxColumns = Math.floor(dimensions.width / GRID_SIZE_DEFAULT) - 2;
    this.setState({
      containerWidth: dimensions.width,
      containerHeight: dimensions.height,
      max: {
        columns: maxColumns,
        rows: maxColumns
      },
      offset: {
        column: this.state.offset.column + maxColumns < columns ? this.state.offset.column : columns - maxColumns,
        row: this.state.offset.row + maxColumns < rows ? this.state.offset.row : rows - maxColumns,
      }
    });
  }
  componentDidMount() {
    this.calculateContainerDimensions();
    window.addEventListener("resize", this.calculateContainerDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateContainerDimensions);
  }
  render() {
    let { children, columns, rows } = this.props;
    let { max, offset } = this.state;
    return <div className={classnames("grid-container", { "grid-container-show-scroll-x": max.columns < columns, "grid-container-show-scroll-y": max.rows < rows })} ref="grid">{
      Children.map(children, child => {
        return cloneElement(child, {
          ...child.props,
          max,
          offset
        });
      })
    }
    <GridScroll type="x">
      <Fader id="grid-container-scroll-x" width={(max.columns) * GRID_SIZE_DEFAULT} type="narrow" min={0} max={columns - max.columns} value={offset.column} onValueChange={ value => 
        this.setState({
          offset: {
            ...offset,
            column: value
          }
        })
      } step={1} />
    </GridScroll>
    <GridScroll type="y">
      <Fader id="grid-container-scroll-y" height={(max.rows) * GRID_SIZE_DEFAULT} orientation="vertical" type="narrow" min={0} max={rows - max.rows} value={offset.row} onValueChange={ value => 
        this.setState({
          offset: {
            ...offset,
            row: value
          }
        })
      } step={1} />
    </GridScroll>
    </div>;
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
  let { children, type } = props;
  return <div className={classnames("grid-axis-item", { [`grid-axis-item-${type}`]: type })}>{children}</div>;
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

let GridScroll = props => {
  let { children, type } = props;
  return <div className={classnames("grid-scroll", { [`grid-scroll-${type}`]: type})}>{children}</div>;
};

export {
  GridContainer,
  GridAxis,
  GridAxisItem,
  Grid,
  GridRow,
  GridScroll,
  GridItem
};