import td from "testdouble";

export let getStubContext = () => {
	let context = {
		createGain: td.function(),
    createPanner: td.function(),
		createBufferSource: td.function()
	};
	td.when(context.createGain()).thenReturn({
		gain: {
			value: 1
		}
	});
	td.when(context.createBufferSource()).thenReturn({
		connect: td.function(),
		start: td.function(),
		playbackRate: {
			value: 1
		}
	});
	td.when(context.createPanner()).thenReturn({
		setPosition: td.function(),
    panningModel: ''
	});
	return context;
};

export let audioNode = td.object({
	connect: () => null,
	disconnect: () => null
});

export let GlobalAudioContext = window.AudioContext = td.function();