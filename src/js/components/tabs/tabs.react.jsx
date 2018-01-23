import React, { Component } from "react";

class Tabs extends Component {
  
  constructor(props){
    super(props);
  }

  render() {
    let { props, state } = this;
    return <div className="tabs">
      {
        props.tabs.map(({ name, id }) => {
          let selected = props.selected === id;
          return <h4 class={selected ? "selected" : ""}><a onClick={() => this.changeTab(id)}>{name}</a></h4>
        })
      }
    </div>
  }

  changeTab(id) {
    this.props.onTabChange(id);
  }
}

export { Tabs };