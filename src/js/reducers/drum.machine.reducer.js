import { 
	CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	TOGGLE_REVERB,
	TOGGLE_BEAT_STATE
} from "../constants/drum.machine.constants";

const initialState = {
	0: {
		currentBankIndex: 0,
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
	]}
};

export default function drumMachine(state = initialState, action) {
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
		default:
			return state;
	}
}