import React, { Component } from "react";

import { Channels } from "../channel/channels.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { Toolbar } from "../toolbar/toolbar.react.jsx";
import { ChannelSelector } from "../channel-selector/channel.selector.react.jsx";

let DrumMachine = (props) => {
	let machine = props.drumMachine[props.machineId];
	return <div className="drum-machine">
		<Toolbar {...props} machine={machine} />
		<ChannelSelector {...props} machine={machine} />
		<Channels {...props} machine={machine} />
		<Pattern {...props} machine={machine} />
	</div>
};

export { DrumMachine };