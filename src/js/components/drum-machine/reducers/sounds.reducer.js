const initialState = {
	0: {
		name: "kick",
		path: "samples/808/01_KCK1.WAV"
	},
	1: {
		name: "clap",
		path: "samples/808/15_CLP2.WAV"
	}
};

export default function sounds(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}