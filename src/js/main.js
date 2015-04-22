var onContext = require('./AudioAPI/context').context,
	contextHelper = require('./AudioAPI/context').helper,
	getBuffer = require('./Request/request').getBuffer;

var onKick = getBuffer('samples/808/01_KCK1.WAV');
var onClap = getBuffer('samples/808/15_CLP2.WAV');
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

var playSound = function(buffer, context, time) {
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = buffer;                    // tell the source which sound to play
	source.connect(context.destination);       // connect the source to the context's destination (the speakers)
	source.start(time || context.currentTime);                           // play the source now
};

Promise.all([onContext, onKick, onClap]).then(function(promises){
	var context = promises[0];
	var kick = promises[1];
	var clap = promises[2];
	var kickDecode = contextHelper.decodeAudioData(kick, context);
	var clapDecode = contextHelper.decodeAudioData(clap, context);
	Promise.all([kickDecode, clapDecode])
	.then(function(promises){
		var kickBuffer = promises[0];
		var clapBuffer = promises[1];
		kicks.forEach(function(kick, i){
			if(!kick) return;
			playSound(kickBuffer, context, (i + 1) * segmentTime);
		});
		claps.forEach(function(clap, i){
			if(!clap) return;
			playSound(clapBuffer, context, (i + 1) * segmentTime);
		});
    });
});