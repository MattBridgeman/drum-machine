import { CHANGE_SELECTED_CHANNEL } from "../constants/channel.constants";

export function changeSelectedChannel(newChannelId) {
  return {
    type: CHANGE_SELECTED_CHANNEL,
    value: newChannelId
  };
}