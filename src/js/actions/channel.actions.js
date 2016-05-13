import { CHANGE_SELECTED_CHANNEL, TOGGLE_SOLO_CHANNEL } from "../constants/channel.constants";

export function changeSelectedChannel(newChannelId) {
	return {
		type: CHANGE_SELECTED_CHANNEL,
		value: newChannelId
	};
}

export function toggleSoloChannel(channelId) {
	return {
		type: TOGGLE_SOLO_CHANNEL,
		value: channelId
	};
}