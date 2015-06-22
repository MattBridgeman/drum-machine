class WebAudioContext {
	constructor() {
		this.context = this.createAudioContext();
	}
	createAudioContext() {
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		return new AudioContext();
	}
	decodeAudioData(buffer) {
		var self = this;
		return new Promise(function(resolve, reject) {
			self.context.decodeAudioData(buffer, resolve, reject);
		});
	}
	playSound(buffer, time) {
		var source = this.context.createBufferSource();
		source.buffer = buffer;
		source.connect(this.context.destination);
		source.start(time || this.context.currentTime);
	}
}

function browserSupportsWebAudio() {
	try {
		// Fix up for prefixing
		var AudioContext = new WebAudioContext();
		return true;
	}
	catch(e) {
		return false;
	}
}

export { WebAudioContext, browserSupportsWebAudio };