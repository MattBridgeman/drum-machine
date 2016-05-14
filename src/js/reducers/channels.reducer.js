import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL, CHANGE_VOLUME_BY_AMOUNT, CHANGE_VOLUME_TO_AMOUNT } from "../constants/channel.constants";

const initialState = [
	{
		sound: 0,
		patterns: [0],
		volume: 50,
		selected: true,
		solo: false,
		mute: true
	},
	{
		sound: 1,
		patterns: [1],
		volume: 50,
		solo: true,
		mute: false
	},
	{
		sound: 2,
		patterns: [2],
		volume: 50
	},
	{
		sound: 3,
		patterns: [3],
		volume: 50
	},
	{
		sound: 4,
		patterns: [4],
		volume: 50
	},
	{
		sound: 5,
		patterns: [5],
		volume: 50
	},
	{
		sound: 6,
		patterns: [6],
		volume: 50
	},
	{
		sound: 7,
		patterns: [7],
		volume: 50
	},
	{
		sound: 8,
		patterns: [8],
		volume: 50
	}
];

export default function channels(state = initialState, action) {
	switch (action.type) {
		case CHANGE_VOLUME_BY_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { volume: channel.volume + action.value }) : channel
				);
		case CHANGE_VOLUME_TO_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { volume: action.value }) : channel
				);
		case CHANGE_SELECTED_CHANNEL:
			return state
				.map((channel, i) =>
					Object.assign({}, channel, { selected: action.value === i })
				);
		case TOGGLE_SOLO_CHANNEL:
			return state
				.map((channel, i) =>
					action.value === i ? Object.assign({}, channel, { solo: !channel.solo }) : channel
				);
		default:
			return state;
	}
}