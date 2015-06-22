import { WebAudioContext } from './AudioAPI/context';
import { getBuffer } from './Request/request';

var context = new WebAudioContext();
var sounds = ['samples/808/01_KCK1.WAV', 'samples/808/15_CLP2.WAV'];
var kickBuffer = null;
var clapBuffer = null;
var kicks = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0];
var claps = [0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1];
var bpm = 120;
var secondsInMinute = 60;
var beatsPerBar = 4;
var segmentsPerBeat = 4;
var beatsPerSecond = secondsInMinute / bpm;
var segmentTime = beatsPerSecond / segmentsPerBeat;

Promise.all(sounds.map(getBuffer))
.then(function(promises){
	return Promise.all(promises.map(function(sound){
		return context.decodeAudioData(sound);
	}));
})
.then(function(promises){
	var kickBuffer = promises[0];
	var clapBuffer = promises[1];
	kicks.forEach(function(kick, i){
		if(!kick) return;
		context.playSound(kickBuffer, (i + 1) * segmentTime);
	});
	claps.forEach(function(clap, i){
		if(!clap) return;
		context.playSound(clapBuffer, (i + 1) * segmentTime);
	});
})
.catch(console.log.bind(console));;

var React = require('react');

var TodoApp = require('./components/HelloWorld.react');

React.render(
  <TodoApp />,
  document.getElementById('drum-machine')
);