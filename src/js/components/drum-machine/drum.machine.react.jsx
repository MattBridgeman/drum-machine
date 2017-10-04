import React, { Component } from "react";

import { Channels } from "../channel/channels.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { Toolbar } from "../toolbar/toolbar.react.jsx";
import { ChannelSelector } from "../channel-selector/channel.selector.react.jsx";

let DrumMachine = (props) =>
	<div className="drum-machine">
		<Toolbar {...props} />
		<ChannelSelector {...props} />
		<Channels {...props} />
		<Pattern {...props} />
	</div>;

export { DrumMachine };