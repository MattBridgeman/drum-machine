import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL, TOGGLE_MUTE_CHANNEL, CHANGE_VOLUME_BY_AMOUNT, CHANGE_VOLUME_TO_AMOUNT, CHANGE_PITCH_BY_AMOUNT, CHANGE_PITCH_TO_AMOUNT, CHANGE_DECAY_BY_AMOUNT, CHANGE_DECAY_TO_AMOUNT } from "../constants/channel.constants";

const initialState = [
	{
		sound: 0,
		patterns: [0],
		volume: 50,
		selected: true,
		pitch: 50,
		decay: 100,
		pan: -1
	},
	{
		sound: 1,
		patterns: [1],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 2,
		patterns: [2],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 3,
		patterns: [3],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 4,
		patterns: [4],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 5,
		patterns: [5],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 6,
		patterns: [6],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 7,
		patterns: [7],
		volume: 50,
		pitch: 50,
		decay: 100
	},
	{
		sound: 8,
		patterns: [8],
		volume: 50,
		pitch: 50,
		decay: 100
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
		case CHANGE_PITCH_BY_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { pitch: channel.pitch + action.value }) : channel
				);
		case CHANGE_PITCH_TO_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { pitch: action.value }) : channel
				);
		case CHANGE_DECAY_BY_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { decay: channel.decay + action.value }) : channel
				);
		case CHANGE_DECAY_TO_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { decay: action.value }) : channel
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
		case TOGGLE_MUTE_CHANNEL:
			return state
				.map((channel, i) =>
					action.value === i ? Object.assign({}, channel, { mute: !channel.mute }) : channel
				);
		default:
			return state;
	}
}