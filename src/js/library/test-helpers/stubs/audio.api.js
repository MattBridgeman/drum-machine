import td from "testdouble";

export let getStubContext = () => {
	let context = {
		currentTime: 1234,
		createGain: () => ({
			connect: td.function(),
			gain: {
				value: 1,
				linearRampToValueAtTime: td.function(),
				setValueAtTime: td.function(),
				setTargetAtTime: td.function()
			}
		}),
    createPanner: () => ({
			connect: td.function(),
			setPosition: td.function(),
			panningModel: ''
		}),
    createOscillator: () => ({
			start: td.function(),
			connect: td.function(),
			type: 'sine',
			frequency: {
				setValueAtTime: td.function(),
				setTargetAtTime: td.function(),
				value: 0
			}
		}),
		createBufferSource: () => ({
			connect: td.function(),
			start: td.function(),
			playbackRate: {
				value: 1
			}
		}),
		createBiquadFilter: () => ({
			connect: td.function(),
			type: 'lowpass',
			frequency: {
				setValueAtTime: td.function(),
				setTargetAtTime: td.function(),
				value: 0
			},
			Q: {
				setValueAtTime: td.function(),
				setTargetAtTime: td.function(),
				value: 0
			}
		}),
	};
	return context;
};

export let audioNode = td.object({
	connect: () => null,
	disconnect: () => null
});

export let GlobalAudioContext = window.AudioContext = td.function();