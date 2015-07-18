var DrumMachineStore = {
	tempo: {
		beatsPerMinute: 120,
		beatsPerBar: 4,
		segmentsPerBeat: 4
	},
	selectedSoundIndex: 0,
	sounds: [{
		name: "kick",
		path: "samples/808/01_KCK1.WAV"
	}, {
		name: "clap",
		path: "samples/808/15_CLP2.WAV"
	}],
	patterns: [{
		name: "kick",
		patterns: [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
		]
	}, {
		name: "kick",
		patterns: [
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1]
		]
	}]
};

export { DrumMachineStore };