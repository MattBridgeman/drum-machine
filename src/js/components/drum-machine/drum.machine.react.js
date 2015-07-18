import { WebAudioContext } from "../../audio-api/context";
import { Tempo } from "../../audio-api/tempo";
import { arrayBuffer } from "../../request/arraybuffer";
import * as React from "react";
import { PlayHeading } from "../play-heading/play.heading.react";
import { DrumMachineStore } from './stores/drum.machine.store';

var tempo = new Tempo(DrumMachineStore.tempo);
var context = new WebAudioContext();

var sounds = Promise.all(DrumMachineStore.sounds.map(function(item){
	return item.path;
})
.map(arrayBuffer))
.then(function(promises){
	return context.decodeAudioDataArray(promises);
});

var isPlaying = false;

function play() {
	sounds.then(function(promises){
		promises.map(function(buffer, index){
			var pattern = DrumMachineStore.patterns[index].patterns[0];
			pattern.forEach(function(segment, i){
				if(!segment) {
					return;
				}
				context.playSound(buffer, (i * tempo.getSegmentTimeInSeconds()) + context.context.currentTime);
			});
		});
	})
	.catch(console.log.bind(console));
};

function pause() {
	//place holder for pause
};

function playPause(){
	isPlaying = !isPlaying;
	if(isPlaying) {
		play();
	} else {
		pause();
	}
	notify();
}

function getState(){
	return {
		isPlaying: isPlaying,
		time: "00:00"
	}
}

var listeners = [];

function notify(){
	listeners.forEach((listener) => {
		listener();
	});
};

function addListener(listener){
	return listeners.push(listener) - 1;
}

function removeListener(listenerIndex){
	listeners.splice(listenerIndex, 1);
}

class DrumMachine extends React.Component {

	constructor(props) {
		super(props);
		this.state = getState();
	}

	render() {
		return (
			<div className="drum-machine">
				<PlayHeading isPlaying={this.state.isPlaying} value={this.state.time} onPlayPause={playPause} />
			</div>
		);
	}

	componentDidMount() {
		this.listenerIndex = addListener(this.onChange.bind(this));
	}
	
	componentWillUnmount() {
		removeListener(this.listenerIndex);
	}
	
	onChange(){
		this.setState(getState());
	}

}

export { DrumMachine };