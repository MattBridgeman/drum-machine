import td from "testdouble";

export let getStubContext = () => {
	let context = {
		currentTime: 1234,
		createGain: td.function(),
    createPanner: td.function(),
		createBufferSource: td.function()
	};
	let gainNode = {
		connect: td.function(),
		gain: {
			value: 1,
			linearRampToValueAtTime: td.function()
		}
	};
	let sourceBuffer = {
		connect: td.function(),
		start: td.function(),
		playbackRate: {
			value: 1
		}
	};
	let panner = {
		setPosition: td.function(),
    panningModel: ''
	};
	td.when(context.createGain()).thenReturn(gainNode);
	td.when(context.createBufferSource()).thenReturn(sourceBuffer);
	td.when(context.createPanner()).thenReturn(panner);
	return {
		context,
		gainNode,
		sourceBuffer,
		panner
	};
};

export let audioNode = td.object({
	connect: () => null,
	disconnect: () => null
});

export let GlobalAudioContext = window.AudioContext = td.function();