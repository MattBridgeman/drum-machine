import * as React from "react";
import { Display } from "./components/display/display.react";
import { PlayHeading } from "./components/play-heading/play.heading.react";

React.render(
	(
		<div className="drum-machine">
			<PlayHeading isPlaying={true} value="00:01" />
			<Display name="Tempo" value="120" />
			<Display name="Signature" value="4/4" />
		</div>
	),
	document.getElementById("drum-machine")
);