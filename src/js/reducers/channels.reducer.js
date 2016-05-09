const initialState = [
	{
		sound: 0,
		patterns: [0],
		transformers: [0]
	},
	{
		sound: 1,
		patterns: [1],
		transformers: [1]
	},
	{
		sound: 2,
		patterns: [2],
		transformers: [2]
	},
	{
		sound: 3,
		patterns: [3],
		transformers: [3]
	},
	{
		sound: 4,
		patterns: [4],
		transformers: [4]
	},
	{
		sound: 5,
		patterns: [5],
		transformers: [5]
	},
	{
		sound: 6,
		patterns: [6],
		transformers: [6]
	},
	{
		sound: 7,
		patterns: [7],
		transformers: [7]
	},
	{
		sound: 8,
		patterns: [8],
		transformers: [8]
	}
];

export default function channels(state = initialState, action) {
	switch (action.type) {
		default:
		return state;
	}
}