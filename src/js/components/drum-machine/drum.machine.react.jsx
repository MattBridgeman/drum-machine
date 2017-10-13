import React, { Component } from "react";

import { Channels } from "../channel/channels.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { Toolbar } from "../toolbar/toolbar.react.jsx";
import { ChannelSelector } from "../channel-selector/channel.selector.react.jsx";

let DrumMachine = (props) => {
	let channels = props.drumMachine[props.machineId];
	return <div className="drum-machine">
		<Toolbar {...props} />
		<ChannelSelector {...props} channels={channels} />
		<Channels {...props} channels={channels} />
		<Pattern {...props} channels={channels} />
	</div>
};

export { DrumMachine };