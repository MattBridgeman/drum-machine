import * as React from "react";
import { Display } from "./components/display/display.react.jsx";
import { Beat } from "./components/beat/beat.react.jsx";
import { PlayHeading } from "./components/play-heading/play.heading.react.jsx";
import { Channel } from "./components/channel/channel.react.jsx";
import { Rotator } from "./components/rotator/rotator.react.jsx";
import { SourceSelector } from "./components/source-selector/source.selector.react.jsx";
import { Pattern } from "./components/pattern/pattern.react.jsx";
import { PatternBeat } from "./components/pattern/pattern.beat.react.jsx";

React.render(
	(
		<div className="drum-machine">
			<PlayHeading isPlaying={true} value="00:01" />
			<Display name="Tempo" value="120" />
			<Display name="Signature" value="4/4" />
			<div className="channels">
				<Channel>
					<SourceSelector selectedIndex={0} options={["Kick", "Clap"]} />
					<Rotator name="Volume" />
					<Rotator name="Attack" />
					<Rotator name="Decay" />
					<Rotator name="Tuning" />
					<Rotator name="Send" />
					<Pattern>
						<PatternBeat index={0} current={true} selected={true} />
						<PatternBeat index={1} current={false} selected={false} />
						<PatternBeat index={2} current={false} selected={true} />
					</Pattern>
				</Channel>
				<Channel>
					<SourceSelector selectedIndex={1} options={["Kick", "Clap"]} />
					<Rotator name="Volume" />
					<Rotator name="Attack" />
					<Rotator name="Decay" />
					<Rotator name="Tuning" />
					<Rotator name="Send" />
					<Pattern>
						<PatternBeat index={0} current={true} selected={false} />
						<PatternBeat index={1} current={false} selected={false} />
						<PatternBeat index={2} current={false} selected={true} />
					</Pattern>
				</Channel>
			</div>
		</div>
	),
	document.getElementById("drum-machine")
);