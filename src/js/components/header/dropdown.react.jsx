import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import DrumMachineActions from "../../actions/root.actions";

class DropDownMenu extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }
  
    onOpen() {
      this.setState({
        open: true
      });
    }
    
    onClose() {
      this.setState({
        open: false
      });
    }
    
    onToggle() {
      this.setState({
        open: !this.state.open
      });
    }
  
    render(){
      let { props, state } = this;
      let { open } = state;
      let { items } = props;
      return <div className={"dropdown-menu " + (open ? "open" : "")}>
        <button onClick={() => this.onToggle()} className="dropdown-menu-trigger">
          <span className="icon__menu"></span>
          <span className="icon__menu-hover"></span>
          <span className="assistive">
            { open ? "Close Menu" : "Open Menu"}
          </span>
        </button>
        <div className="dropdown-menu-panel-overlay" onClick={() => this.onClose()}></div>
        <div className="dropdown-menu-panel">
          <ul>
            {
              items
              .filter(item => !item.condition || item.condition())
              .map(item => {
                if(item.callback) {
                  return <li>
                    <button className="dropdown-link" onClick={item.callback}>{item.name}</button>
                  </li>;
                } else {
                  return <li>
                    <NavLink to={item.link} className="dropdown-link" activeClassName="active">{item.name}</NavLink>
                  </li>;
                }
              })
            }
          </ul>
        </div>
      </div>
    }
  };

  export { DropDownMenu };