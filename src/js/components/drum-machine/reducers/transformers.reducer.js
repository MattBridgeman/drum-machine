const initialState = {
	0: {
		name: "volume",
		value: 50
	},
	1: {
		name: "volume",
		value: 50
	}
};

export default function transformers(state = initialState, action) {
	switch (action.type) {
		default:
		return state;
	}
}