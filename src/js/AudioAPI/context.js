var Promise = require('es6-promise').Promise;

var context = new Promise(function(resolve, reject) {
	window.addEventListener('load', function(){
		try {
			// Fix up for prefixing
			var AudioContext = window.AudioContext||window.webkitAudioContext;
			resolve(new AudioContext());
		}
		catch(e) {
			reject(Error('Web Audio API is not supported in this browser'));
		}
	}, false);
});

var helper = {
	decodeAudioData: function(buffer, context){
		return new Promise(function(resolve, reject) {
			context.decodeAudioData(buffer, resolve, reject);
		});
	}
};

module.exports = {
	context: context,
	helper: helper
}