import React, { Component } from "react";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }

  onChange(event, focus) {
    let { value } = event.target;
    this.setState({
      value,
      focus
    });

    if(!focus && this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  componentWillReceiveProps(props) {
    if(!this.state.focus) {
      this.setState({
        value: props.value
      });
    }
  }

  render() {
    return (
      <input className="default-input" type="text" value={this.state.value} onChange={ (event) => this.onChange(event, true) } onBlur={ (event) => this.onChange(event, false) } />
    );
  }
}

