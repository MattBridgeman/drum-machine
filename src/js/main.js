var onContext = require('./AudioAPI/context'),
	getBuffer = require('./Request/request').getBuffer;

onContext.then(function(context) {
  
}, function(err) {
  console.log(err); // Error: "It broke"
});

var onKick = getBuffer('samples/808/01_KCK1.WAV');

Promise.all([onContext, onKick]).then(function(context, kick){

})

onContext
.then(onKick)
.then(function(data){
	console.log(arguments);
})