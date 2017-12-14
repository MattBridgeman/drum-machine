const initialState = {
	0: {
		name: "Bass Drum",
		shortName: "BD",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fbd01.WAV?alt=media&token=77f710d5-78d0-444f-8b0e-33ffd2a5809b"
	},
	1: {
		name: "Snare Drum",
		shortName: "SD",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fsd01.WAV?alt=media&token=b1910128-3f74-4d76-bb9e-7cdb4cbd9330"
	},
	2: {
		name: "Low Tom",
		shortName: "LT",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Flt01.WAV?alt=media&token=522e7d1e-8d8d-46ff-905a-a4e16718f7e0"
	},
	3: {
		name: "Mid Tom",
		shortName: "MT",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fmt01.WAV?alt=media&token=79ce4bf6-4ded-4224-a38f-4be0d032017c"
	},
	4: {
		name: "Hi Tom",
		shortName: "HT",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fht01.WAV?alt=media&token=f6662245-be58-483f-9302-ecec094a8705"
	},
	5: {
		name: "Rim Shot",
		shortName: "RS",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Frs01.WAV?alt=media&token=7e741312-8207-4f52-90d1-6d7d54ef25b3"
	},
	6: {
		name: "Hand Clap",
		shortName: "HC",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fcp01.WAV?alt=media&token=17f0c66a-6d4f-4783-93c6-0cb636b784c1"
	},
	7: {
		name: "Hi Hat",
		shortName: "HH",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Fhh01.WAV?alt=media&token=52125594-e5a5-420d-9aa1-d88f51b4c4b3"
	},
	8: {
		name: "Cymbal",
		shortName: "CY",
		path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Frd01.WAV?alt=media&token=1ce6c343-51e7-4c16-acbf-f03f4bdf6ee3"
	}
};

export default function librarySounds(state = initialState, action) {
	return initialState;
}