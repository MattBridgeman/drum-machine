import React, { Component, Children } from "react";
import classnames from "classnames";

class Collapsible extends Component {
  state = {
    open: this.props.initialState === "open"
  }

  handleToggle(e, child){
    if(child.props.onClick){
      child.props.onClick(e);
    }
    this.setState({
      open: !this.state.open
    });
  }

  render(){
    let { children, disabled } = this.props;
    let { open } = this.state;
    open = open || disabled;
    return (
      <div className={classnames("collapsible", { open, closed: !open, disabled })}>
        {Children.map(children, child => {
          if(child.type.displayName === "CollapsibleHeader") {
            return React.cloneElement(child, {
              onClick: (e) => this.handleToggle(e, child)
            })
          } else {
            return child;
          }
        })}
      </div>
    );
  }
}

class CollapsibleHeader extends Component {

  render(){
    let { children, onClick } = this.props;
    return (
      <div className="collapsible-header">
        <h3><a onClick={onClick}>
          <span className="icon__arrow-down"></span>
          { children }
        </a></h3>
      </div>
    );
  }
}

CollapsibleHeader.displayName = "CollapsibleHeader";

class CollapsibleContent extends Component {
  render(){
    let { children } = this.props;
    return (
      <div className="collapsible-content">
        { children }
      </div>
    );
  }
}

export {
  CollapsibleContent,
  CollapsibleHeader,
  Collapsible
};