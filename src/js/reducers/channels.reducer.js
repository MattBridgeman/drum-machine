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
	}
];

export default function channels(state = initialState, action) {
	switch (action.type) {
		default:
		return state;
	}
}