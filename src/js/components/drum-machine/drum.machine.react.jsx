// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DrumMachineActions from './actions/drum.machine.actions';

import { Display } from "../display/display.react.jsx";
import { PlayHeading } from "../play-heading/play.heading.react.jsx";
import { Channel } from "../channel/channel.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { SourceSelector } from "../source-selector/source.selector.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";

// var tempo = new Tempo(DrumMachineStore.data.tempo);
// var context = new WebAudioContext();
// var sequencer = new Sequencer(context, tempo);

// var soundPromises = Promise.all(DrumMachineStore.data.sounds.map(function(item){
// 	return item.path;
// })
// .map(arrayBuffer))
// .then(function(promises){
// 	return context.decodeAudioDataArray(promises);
// });

// soundPromises.then(function(soundBuffers){
// 	soundBuffers.map(function(buffer, index){
// 		var patterns = DrumMachineStore.data.patterns[index].patterns;
// 		sequencer.schedule(buffer, patterns);
// 	});
// })
// .catch(console.log.bind(console));


class DrumMachine extends Component {

	constructor(props) {
		super(props);
	}

	render() {		
		return (
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
		);
	}

}

function mapStateToProps(state) {
	return state.drumMachine;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DrumMachineActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrumMachine);