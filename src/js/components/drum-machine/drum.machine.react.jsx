// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

import { Display } from "../display/display.react.jsx";
import { PlayHeading } from "../play-heading/play.heading.react.jsx";
import { Channel } from "../channel/channel.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { SourceSelector } from "../source-selector/source.selector.react.jsx";
import { ValueSelector } from "../value-selector/value.selector.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { PlayToggle } from "../play-toggle/play.toggle.react.jsx";

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
		const { channels, tempo, playState, sounds, patterns, transformers, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
		const transformersActions = bindActionCreators(DrumMachineActions.transformers, dispatch);
		const patternsActions = bindActionCreators(DrumMachineActions.patterns, dispatch);
		
		return (
			<div className="drum-machine">
			<div className="channels">
				<Channel>
					<PlayToggle isPlaying={ playState.isPlaying } onPlayPause={ playStateActions.togglePlayPause } />
				</Channel>
				<Channel>
					<Rotator name="Tempo" value={tempo.beatsPerMinute} min={60} max={180} onKnobRotate={ (amount) => tempoActions.changeBPMByAmount(amount) } onValueChange={ (value) => tempoActions.changeBPM(value) } />
				</Channel>
			</div>
			<div className="channels">
				{channels.map((channel, i) =>
					<Channel>
						<SourceSelector selectedIndex={i} options={channels.map(c => sounds[c.sound].name)} />
						{ channel.transformers
							.map((transformerId) => ({ transformerId, transformer: transformers[transformerId] }))
							.map(({ transformerId, transformer }) =>
								<Rotator name={transformer.name} value={transformer.value} onKnobRotate={ (amount) => transformersActions.changeTransformByAmount(transformerId, amount) } onValueChange={ (value) => transformersActions.changeTransformToAmount(transformerId, value) } />
							)
						}
					</Channel>
				)}
			</div>
				<Pattern>
					{ channels
						.filter((channel, i) => i === 0)
						.map((channel, i) => 
							patterns[channel.patterns[playState.currentBarIndex]].map((beat, index) => 
								<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => patternsActions.toggleBeat(channel.patterns[playState.currentBarIndex], !beat, index)} />
							)
						)
					}
				</Pattern>
		</div>
		);
	}

}

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(DrumMachine);