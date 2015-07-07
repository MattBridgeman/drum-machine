import * as React from "react";
import { Display } from "./components/display/display.react";
import { Beat } from "./components/beat/beat.react";
import { PlayHeading } from "./components/play-heading/play.heading.react";

React.render(
	(
		<div className="drum-machine">
			<PlayHeading isPlaying={true} value="00:01" />
			<Display name="Tempo" value="120" />
			<Display name="Signature" value="4/4" />
			<Beat name="Kick" value="1/16" beats={[1,0,0,0]} />
		</div>
	),
	document.getElementById("drum-machine")
);