import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";

class ChannelSelector extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, sounds, dispatch } = this.props;
		const channelActions = bindActionCreators(DrumMachineActions.channel, dispatch);
		
		return (
      <div className="channel-selector">
        <h3 ref="name" className="item-title">Sound Selector</h3>
        <div className="item-tray">
          {channels.map((channel, i) =>
            <div className="selector-button">
              <ToggleButton onClick={() => channelActions.changeSelectedChannel(i)} name={sounds[channel.sound].shortName} selected={channel.selected} classes="red" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export { ChannelSelector };