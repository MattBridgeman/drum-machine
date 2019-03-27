import React, { Component, Children, cloneElement } from "react";
import classnames from "classnames";

class Selector extends Component {
  render() {
    let { onValueChange, children, id } = this.props;
    return <div className="selector-container">
      <div className="visual-selector" aria-hidden="true">
        <div className="selector-options">
          {children}
        </div>
        <div className="selector-buttons">
          <button className="button" onClick={() => this.handleIncrement()}>
            <span className="icon__arrow-up"></span>
            <span className="assistive">Increment</span>
          </button>
          <button className="button" onClick={() => this.handleDecrement()}>
            <span className="icon__arrow-down"></span>
            <span className="assistive">Decrement</span>
          </button>
        </div>
      </div>
      <select className="assistive" id={id} onChange={ (e) => onValueChange(e.target.value) }>
        {children}
      </select>
    </div>;
  }
}

class SelectorOption extends Component {
  render() {
    let { name, value, selected, children } = this.props;
		return (
      <div className={classnames("selector-option", { selected })} ref="faderContainer">
        <span className="selector-option-label">{name}</span>
        <option value={value} selected={selected}>{children}</option>
      </div>
		);
  }
}

export { Selector, SelectorOption };