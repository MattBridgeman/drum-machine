// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as DrumMachineActions from "./actions/drum.machine.actions";

import { Display } from "../display/display.react.jsx";
import { PlayHeading } from "../play-heading/play.heading.react.jsx";
import { Channel } from "../channel/channel.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { SourceSelector } from "../source-selector/source.selector.react.jsx";
import { ValueSelector } from "../value-selector/value.selector.react.jsx";
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
		const { channels, tempo, dispatch } = this.props;
		const actions = bindActionCreators(DrumMachineActions, dispatch);
		return (
			<div className="drum-machine">
			<PlayHeading isPlaying={true} value="00:01" />
			<Display name="Tempo" value={tempo.beatsPerMinute} />
			<Display name="Signature" value={tempo.segmentsPerBeat + "/" + tempo.beatsPerBar} />
			<div className="channels">
				<Channel>
					<ValueSelector ref="tempoValueSelector" title="Tempo" value={tempo.beatsPerMinute} onIncrement={actions.incrementBPM} onDecrement={actions.decrementBPM} />
				</Channel>
			</div>
			<div className="channels">
				{channels.map((channel) =>
					<Channel>
						<SourceSelector selectedIndex={channel.sound.index} options={channels.map(c => c.sound.name)} />
						{channel.transformers.map((transformer, index) =>
							<Rotator name={transformer.name} value={transformer.value} onKnobRotate={function(){}} />
						)}
						<Pattern>
							{channel.pattern.value.map((beat, index) =>
								<PatternBeat id={beat.id} index={index} current={false} selected={!!beat.value} onToggle={actions.toggleBeat} />
							)}
						</Pattern>
					</Channel>
				)}
			</div>
		</div>
		);
	}

}

function mapStateToProps(state) {
	//return state.drumMachine;
	return {
		tempo: state.tempo,
		channels: [
			{
				sound: {
					id: 0,
					index: 0,
					name: "kick"
				},
				transformers: [
					{
						name: "volume",
						value: 50
					}
				],
				pattern: {
					value: [{
						id: 0,
						value: 1
					}, {
						id: 1,
						value: 0
					}, {
						id: 2,
						value: 0
					}, {
						id: 3,
						value: 0
					}, {
						id: 4,
						value: 1
					}, {
						id: 5,
						value: 0
					}, {
						id: 6,
						value: 0
					}, {
						id: 7,
						value: 0
					}, {
						id: 8,
						value: 1
					}, {
						id: 9,
						value: 0
					}, {
						id: 10,
						value: 0
					}, {
						id: 11,
						value: 0
					}, {
						id: 12,
						value: 1
					}, {
						id: 13,
						value: 0
					}, {
						id: 14,
						value: 0
					}, {
						id: 15,
						value: 0
					}]
				}
			}
		]
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DrumMachineActions, dispatch);
}

export default connect(mapStateToProps)(DrumMachine);