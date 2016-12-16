import React, { Component } from "react";
import { connect } from "react-redux";

import { Channels } from "../channel/channels.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { Toolbar } from "../toolbar/toolbar.react.jsx";
import { ChannelSelector } from "../channel-selector/channel.selector.react.jsx";

class DrumMachine extends Component {

	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div className="container">
				<div className="drum-machine">
					<Toolbar {...this.props} />
					<ChannelSelector {...this.props} />
					<Channels {...this.props} />
					<Pattern {...this.props} />
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(DrumMachine);