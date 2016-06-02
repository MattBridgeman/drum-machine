import { 
	CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_BY_AMOUNT,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_BY_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_PAN_BY_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	CHANGE_DECAY_BY_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	TOGGLE_REVERB
} from "../constants/channel.constants";

const initialState = [
	{
		sound: 0,
		patterns: [0, 1, 2, 3, 4, 5, 6, 7],
		volume: 50,
		selected: true,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 1,
		patterns: [8, 9, 10, 11, 12, 13, 14, 15],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 2,
		patterns: [16, 17, 18, 19, 20, 21, 22, 23],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 3,
		patterns: [24, 25, 26, 27, 28, 29, 30, 31],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 4,
		patterns: [32, 33, 34, 35, 36, 37, 38, 39],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 5,
		patterns: [40, 41, 42, 43, 44, 45, 46, 47],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 6,
		patterns: [48, 49, 50, 51, 52, 53, 54, 55],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 7,
		patterns: [56, 57, 58, 59, 60, 61, 62, 63],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 8,
		patterns: [64, 65, 66, 67, 68, 69, 70, 71],
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
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
		case CHANGE_PAN_BY_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { pan: channel.pan + action.value }) : channel
				);
		case CHANGE_PAN_TO_AMOUNT:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { pan: action.value }) : channel
				);
		case TOGGLE_REVERB:
			return state
				.map((channel, i) =>
					action.channelId === i ? Object.assign({}, channel, { reverb: !channel.reverb }) : channel
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