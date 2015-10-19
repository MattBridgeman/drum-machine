class WebAudioContext {
	constructor() {
		this.context = this.createAudioContext();
	}
	createAudioContext() {
		var AudioContext = window.AudioContext || window.webkitAudioContext;
		return new AudioContext();
	}
	decodeAudioData(buffer) {
		return new Promise((resolve, reject) =>
			this.context.decodeAudioData(buffer, resolve, reject)
		);
	}
	decodeAudioDataArray(arrayOfBuffers) {
		return Promise.all(arrayOfBuffers.map((sound) =>
			this.decodeAudioData(sound)
		));
	}
	playSound(buffer, time) {
		var source = this.context.createBufferSource();
		source.buffer = buffer;
		source.connect(this.context.destination);
		source.start(time || this.context.currentTime);
	}
	getCurrentTime(){
		return this.context.currentTime;
	}
}

export { WebAudioContext };