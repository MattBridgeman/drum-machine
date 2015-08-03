import { WebAudioContext } from "../../audio-api/context";
import { Tempo } from "../../audio-api/tempo";
import { Sequencer } from "../../audio-api/sequencer";
import { arrayBuffer } from "../../request/arraybuffer";
import * as React from "react";
import { PlayHeading } from "../play-heading/play.heading.react";
import { DrumMachineStore } from './stores/drum.machine.store';
import { DrumMachineConstants } from './constants/drum.machine.constants';

var tempo = new Tempo(DrumMachineStore.data.tempo);
var context = new WebAudioContext();
var sequencer = new Sequencer(context, tempo);

var soundPromises = Promise.all(DrumMachineStore.data.sounds.map(function(item){
	return item.path;
})
.map(arrayBuffer))
.then(function(promises){
	return context.decodeAudioDataArray(promises);
});

soundPromises.then(function(soundBuffers){
	soundBuffers.map(function(buffer, index){
		var patterns = DrumMachineStore.data.patterns[index].patterns;
		sequencer.schedule(buffer, patterns);
	});
})
.catch(console.log.bind(console));

function getState(){
	return {
		isPlaying: DrumMachineStore.data.state.isPlaying,
		time: "00:00"
	}
}

class DrumMachine extends React.Component {

	constructor(props) {
		super(props);
		this.state = getState();
	}

	render() {
		return (
			<div className="drum-machine">
				<PlayHeading isPlaying={this.state.isPlaying} value={this.state.time} onPlayPause={sequencer.toggleStart.bind(sequencer)} />
			</div>
		);
	}

	componentDidMount() {
		this.listenerIndex = DrumMachineStore.on(DrumMachineConstants.CHANGE_EVENT, this.onChange.bind(this));
	}
	
	componentWillUnmount() {
		DrumMachineStore.off(DrumMachineConstants.CHANGE_EVENT, this.onChange);
	}
	
	onChange(){
		this.setState(getState());
	}

}

export { DrumMachine };