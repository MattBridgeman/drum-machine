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
		const { channels, tempo, playState, sounds, patterns, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
		const patternsActions = bindActionCreators(DrumMachineActions.patterns, dispatch);
		const channelActions = bindActionCreators(DrumMachineActions.channel, dispatch);
		
		return (
			<div className="drum-machine">
				<div className="channels">
					<div className="channel">
						<PlayToggle isPlaying={ playState.isPlaying } onPlayPause={ playStateActions.togglePlayPause } />
					</div>
					<div className="channel">
						<div className="channel-item">
							<h3 ref="name" className="item-title">Tempo</h3>
						</div>
						<Rotator value={tempo.beatsPerMinute} min={50} max={190} onKnobRotate={ (amount) => tempoActions.changeBPMByAmount(amount) } onValueChange={ (value) => tempoActions.changeBPM(value) } />
					</div>
				</div>
				<div className="channels">
					{channels.map((channel, i) =>
						<Channel name={sounds[channel.sound].name} selected={channel.selected} solo={channel.solo} onSelectClick={() => channelActions.changeSelectedChannel(i)}  onSoloClick={() => channelActions.toggleSoloChannel(i)}  onMuteClick={() => channelActions.toggleMuteChannel(i)} muted={channel.mute}>
							<Rotator name="Volume" value={channel.volume} onKnobRotate={ (amount) => channelActions.changeVolumeByAmount(i, amount) } onValueChange={ (value) => channelActions.changeTransformToAmount(i, value) } />
						</Channel>
					)}
				</div>
				<Pattern>
					{ channels
						.filter((channel, i) => channel.selected)
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