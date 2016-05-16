export function createAudioContext() {
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	return new AudioContext();
}

export function decodeAudioData(context, buffer) {
	return new Promise((resolve, reject) =>
		context.decodeAudioData(buffer, resolve, reject)
	);
}

export function decodeAudioDataArray(context, arrayOfBuffers) {
	return Promise.all(arrayOfBuffers.map((sound) =>
		decodeAudioData(context, sound)
	));
}

export function createBufferSource(context, buffer) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	return source;
}

export function playSound(context, buffer, destination, time, pitch) {
	let bufferSource = createBufferSource(context, buffer);
	bufferSource.playbackRate.value = pitch || 1;
	bufferSource.connect(destination);
	bufferSource.start(time);
}