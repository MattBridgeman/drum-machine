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
		const { channels, tempo, playState, sounds, patterns, transformers, dispatch } = this.props;
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
				{channels.map((channel, i) =>
					<Channel>
						<SourceSelector selectedIndex={i} options={channels.map(c => sounds[c.sound].name)} />
						{ channel.transformers
							.map((transformerId) => transformers[transformerId])
							.map((transformer) =>
								<Rotator name={transformer.name} value={transformer.value} onKnobRotate={function(){}} />
							)
						}
						<Pattern>
							{ patterns[channel.patterns[playState.currentBarIndex]].map((beat, index) =>
								<PatternBeat index={index} current={playState.loopingIndex === index} selected={!!beat} onToggle={actions.toggleBeat} />
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
	return state;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(DrumMachineActions, dispatch);
}

export default connect(mapStateToProps)(DrumMachine);