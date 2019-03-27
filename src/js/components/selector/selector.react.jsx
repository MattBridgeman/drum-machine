import React, { Component, Children, cloneElement } from "react";
import classnames from "classnames";

class Selector extends Component {
  handleIncrement() {
    let { onValueChange, children, id } = this.props;
    let selectedIndex = 0;
    let childProps = Children.map(children, (child, index) => {
      if(child.props.selected) {
        selectedIndex = index;
      }
      return child.props;
    });
    selectedIndex++;
    if(selectedIndex >= children.length) {
      selectedIndex = 0;
    }
    onValueChange(childProps[selectedIndex].value);
  }
  handleDecrement() {
    let { onValueChange, children, id } = this.props;
    let selectedIndex = 0;
    let childProps = Children.map(children, (child, index) => {
      if(child.props.selected) {
        selectedIndex = index;
      }
      return child.props;
    });
    selectedIndex--;
    if(selectedIndex < 0) {
      selectedIndex = children.length - 1;
    }
    onValueChange(childProps[selectedIndex].value);
  }
  render() {
    let { onValueChange, children, id } = this.props;
    return <div className="selector-container">
      <div className="visual-selector" aria-hidden="true">
        <div className="selector-options">
          {children}
        </div>
        <div className="selector-buttons">
          <button className="button" onClick={() => this.handleDecrement()}>
            <span className="icon__arrow-up"></span>
            <span className="assistive">Decrement</span>
          </button>
          <button className="button" onClick={() => this.handleIncrement()}>
            <span className="icon__arrow-down"></span>
            <span className="assistive">Increment</span>
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
        <span className="selector-option-label">{children}</span>
        <option value={value} selected={selected} name={name} className="assistive">{children}</option>
      </div>
		);
  }
}

export { Selector, SelectorOption };