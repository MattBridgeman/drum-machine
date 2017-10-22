import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/root.actions";

import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";

class ChannelSelector extends Component {

	constructor(props) {
		super(props);
	}

	render() {
    const { machine, machineId, sounds, dispatch } = this.props;
    const { channels } = machine;
		const actions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
		
		return (
      <div className="channel-selector">
        <h3 ref="name" className="item-title">Sound Selector</h3>
        <div className="item-tray">
          {channels.map((channel, i) =>
            <div className="selector-button">
              <ToggleButton onClick={() => actions.changeSelectedChannel(machineId, i)} name={sounds[channel.sound].shortName} selected={channel.selected} classes="red" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export { ChannelSelector };