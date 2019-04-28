import { 
	CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	TOGGLE_REVERB,
	TOGGLE_BEAT_STATE,
	NEW_BANK_INDEX,
	CHANGE_SWING_TO_AMOUNT,
	CHANGE_SELECTED_SOUND
} from "../constants/drum.machine.constants";
import {
	NEW_TRACK_LOADING,
	LOAD_DEFAULT_TRACK,
	NEW_TRACK_LOADED
} from "../constants/track.constants";
import { ON_NEW_INSTRUMENT, DELETE_INSTRUMENT } from "../constants/instruments.constants";
import { fromJS } from "immutable";

const initialState = {};

const defaultMachine = {
	currentBankIndex: 0,
	swing: 0,
	channels: [{
		sound: 0,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		selected: true,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 1,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 2,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 3,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 4,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 5,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 6,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 7,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	},
	{
		sound: 8,
		patterns: {
			0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		volume: 50,
		pitch: 50,
		decay: 100,
		pan: 50,
		reverb: false
	}
]};

const defaultState = {
	0: defaultMachine
};

export default function drumMachine(state = initialState, action) {
	const $state = fromJS(state);
	const { instrumentType, machineId, id } = action;
	switch (action.type) {
		case CHANGE_VOLUME_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							volume: action.value
						} : channel
					)
				}
			};
		case CHANGE_PITCH_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							pitch: action.value
						} : channel
					)
				}
			};
		case CHANGE_DECAY_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							decay: action.value
						} : channel
					)
				}
			};
		case CHANGE_PAN_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							pan: action.value
						} : channel
					)
				}
			};
		case TOGGLE_REVERB:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							reverb: !channel.reverb
						} : channel
					)
				}
			};
		case CHANGE_SELECTED_CHANNEL:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						({
							...channel,
							selected: action.value === i
						})
					)
				}
			};
		case CHANGE_SELECTED_SOUND:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						({
							...channel,
							sound: action.channelId === i ? action.value : channel.sound
						})
					)
				}
			};
		case TOGGLE_SOLO_CHANNEL:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.value === i ? {
							...channel,
							solo: !channel.solo
						} : channel
					)
				}
			};
		case TOGGLE_MUTE_CHANNEL:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.value === i ? {
							...channel,
							mute: !channel.mute
						} : channel
					)
				}
			};
		case TOGGLE_BEAT_STATE:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					channels: state[action.machineId].channels
					.map((channel, i) =>
						action.channelId === i ? {
							...channel,
							patterns: {
								...state[action.machineId].channels[action.channelId].patterns,
								[action.bankId]: state[action.machineId].channels[action.channelId].patterns[action.bankId]
									.map((beat, i) => i === action.index ? action.value : beat)
							}
						} : channel
					)
				}
			};
		case NEW_BANK_INDEX:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					currentBankIndex: action.value
				}
			};
		case CHANGE_SWING_TO_AMOUNT:
			return {
				...state,
				[action.machineId]: {
					...state[action.machineId],
					swing: action.value
				}
			}
		case NEW_TRACK_LOADING:
			return initialState;
		case LOAD_DEFAULT_TRACK:
			return defaultState;
		case NEW_TRACK_LOADED:
			return action.drumMachine;
		case ON_NEW_INSTRUMENT:
			if(action.instrumentType === "drumMachine") {
				return {
					...state,
					[action.machineId]: defaultMachine
				}
			}
			return state;
		case DELETE_INSTRUMENT:
			if(instrumentType === "drumMachine") {
				return $state.delete(machineId.toString()).toJS();
			}
			return state;
		default:
			return state;
	}
}