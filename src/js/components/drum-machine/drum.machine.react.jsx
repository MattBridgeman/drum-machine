import { WebAudioContext } from "../../audio-api/context";
import { Tempo } from "../../audio-api/tempo";
import { Sequencer } from "../../audio-api/sequencer";
import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { PlayHeading } from "../play-heading/play.heading.react.jsx";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DrumMachineActions from './actions/drum.machine.actions';

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
				hello world
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