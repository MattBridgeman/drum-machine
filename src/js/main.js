import { WebAudioContext } from "./audio-api/context";
import { Tempo } from "./audio-api/tempo";
import { arrayBuffer } from "./request/arraybuffer";
import * as React from "react";
import { HelloWorld } from "./components/helloworld.react";

var data = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	},
	selectedSoundIndex: 0,
	sounds: [{
		name: "kick",
		path: "samples/808/01_KCK1.WAV",
		patterns: [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
		]
	}, {
		name: "clap",
		path: "samples/808/15_CLP2.WAV",
		patterns: [
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1]
		]
	}]
};
var tempo = new Tempo(data.tempo);
var context = new WebAudioContext();

Promise.all(data.sounds.map(function(item){
	return item.path;
})
.map(arrayBuffer))
.then(function(promises){
	return context.decodeAudioDataArray(promises);
})
.then(function(promises){
	promises.map(function(buffer, index){
		var pattern = data.sounds[index].patterns[0];
		pattern.forEach(function(segment, i){
			if(!segment) {
				return;
			}
			context.playSound(buffer, (i + 5) * tempo.getSegmentTimeInSeconds());
		});
	});
})
.catch(console.log.bind(console));