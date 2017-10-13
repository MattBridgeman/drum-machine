import td from "testdouble";

export let getStubContext = () => {
	let context = {
		currentTime: 1234,
		createGain: () => ({
			connect: td.function(),
			gain: {
				value: 1,
				linearRampToValueAtTime: td.function()
			}
		}),
    createPanner: () => ({
			connect: td.function(),
			setPosition: td.function(),
			panningModel: ''
		}),
		createBufferSource: () => ({
			connect: td.function(),
			start: td.function(),
			playbackRate: {
				value: 1
			}
		})
	};
	return context;
};

export let audioNode = td.object({
	connect: () => null,
	disconnect: () => null
});

export let GlobalAudioContext = window.AudioContext = td.function();