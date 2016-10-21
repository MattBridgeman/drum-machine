// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Channels } from "../channel/channels.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { Toolbar } from "../toolbar/toolbar.react.jsx";

class DrumMachine extends Component {

	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div className="drum-machine">
				<Toolbar {...this.props} />
				<Channels {...this.props} />
				<Pattern {...this.props} />
		</div>
		);
	}

}

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(DrumMachine);