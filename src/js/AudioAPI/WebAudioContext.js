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
	decodeAudioDataArray(arrayOfBuffers) {
		var self = this;
		return Promise.all(arrayOfBuffers.map(function(sound){
			return self.decodeAudioData(sound);
		}));
	}
	playSound(buffer, time) {
		var source = this.context.createBufferSource();
		source.buffer = buffer;
		source.connect(this.context.destination);
		source.start(time || this.context.currentTime);
	}
}

export { WebAudioContext };