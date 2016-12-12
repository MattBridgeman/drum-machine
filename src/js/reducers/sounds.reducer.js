//Sounds from http://bedroomproducersblog.com/2014/04/24/roland-tr-909-samples/

const initialState = {
	0: {
		name: "Bass Drum",
		shortName: "BD",
		path: "samples/909-2/bd01.WAV"
	},
	1: {
		name: "Snare Drum",
		shortName: "SD",
		path: "samples/909-2/sd01.WAV"
	},
	2: {
		name: "Low Tom",
		shortName: "LT",
		path: "samples/909-2/lt01.WAV"
	},
	3: {
		name: "Mid Tom",
		shortName: "MT",
		path: "samples/909-2/mt01.WAV"
	},
	4: {
		name: "Hi Tom",
		shortName: "HT",
		path: "samples/909-2/ht01.WAV"
	},
	5: {
		name: "Rim Shot",
		shortName: "RS",
		path: "samples/909-2/rs01.WAV"
	},
	6: {
		name: "Hand Clap",
		shortName: "HC",
		path: "samples/909-2/cp01.WAV"
	},
	7: {
		name: "Hi Hat",
		shortName: "HH",
		path: "samples/909-2/hh01.WAV"
	},
	8: {
		name: "Cymbal",
		shortName: "CY",
		path: "samples/909-2/rd01.WAV"
	}
};

export default function sounds(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}