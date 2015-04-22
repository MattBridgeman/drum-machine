var onContext = require('./AudioAPI/context'),
	getBuffer = require('./Request/request').getBuffer;

onContext.then(function(context) {
  
}, function(err) {
  console.log(err); // Error: "It broke"
});

var onKick = getBuffer('samples/808/01_KCK1.WAV');
var kickBuffer = null;

var playSound = function(buffer, context) {
	var source = context.createBufferSource(); // creates a sound source
	source.buffer = buffer;                    // tell the source which sound to play
	source.connect(context.destination);       // connect the source to the context's destination (the speakers)
	source.start(0);                           // play the source now
};

Promise.all([onContext, onKick]).then(function(promises){
	var context = promises[0];
	var kick = promises[1];
	context.decodeAudioData(kick, function(buffer) {
      kickBuffer = buffer;
      playSound(kickBuffer, context);
    });
});

onContext
.then(onKick)
.then(function(data){
	console.log(arguments);
})