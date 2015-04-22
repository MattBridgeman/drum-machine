var onContext = require('./AudioAPI/context'),
	getBuffer = require('./Request/request').getBuffer;

var onKick = getBuffer('samples/808/01_KCK1.WAV');
var kickBuffer = null;
var kicks = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0];
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

Promise.all([onContext, onKick]).then(function(promises){
	var context = promises[0];
	var kick = promises[1];
	context.decodeAudioData(kick, function(buffer) {
		kickBuffer = buffer;
		kicks.forEach(function(kick, i){
			if(!kick) return;
			playSound(kickBuffer, context, (i + 1) * segmentTime);
		});
    });
});