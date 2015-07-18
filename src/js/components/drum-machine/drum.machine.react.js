import { WebAudioContext } from "../../audio-api/context";
import { Tempo } from "../../audio-api/tempo";
import { arrayBuffer } from "../../request/arraybuffer";
import * as React from "react";
import { PlayHeading } from "../play-heading/play.heading.react";

var data = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	},
	selectedSoundIndex: 0,
	sounds: [{
		name: "kick",
		path: "samples/808/01_KCK1.WAV"
	}, {
		name: "clap",
		path: "samples/808/15_CLP2.WAV"
	}],
	patterns: [{
		name: "kick",
		patterns: [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
		]
	}, {
		name: "kick",
		patterns: [
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1]
		]
	}]
};
var tempo = new Tempo(data.tempo);
var context = new WebAudioContext();

var sounds = Promise.all(data.sounds.map(function(item){
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
			var pattern = data.patterns[index].patterns[0];
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