const initialState = {
	currentSegmentIndex: 0,
	currentBarIndex: 0,
	loopingIndex: 0
};

export default function playState(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}