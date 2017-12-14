import {
	CHANGE_SELECTED_CHANNEL,
	TOGGLE_SOLO_CHANNEL,
	TOGGLE_MUTE_CHANNEL,
	CHANGE_VOLUME_TO_AMOUNT,
	CHANGE_PITCH_TO_AMOUNT,
	CHANGE_DECAY_TO_AMOUNT,
	CHANGE_PAN_TO_AMOUNT,
	TOGGLE_REVERB,
	TOGGLE_BEAT_STATE,
	NEW_BANK_INDEX,
	CHANGE_SWING_TO_AMOUNT,
	CHANGE_SELECTED_SOUND
} from "../constants/drum.machine.constants";

export function changeVolumeToAmount(machineId, channelId, value){
	return {
		type: CHANGE_VOLUME_TO_AMOUNT,
		channelId,
		machineId,
		value
	};
}

export function changePitchToAmount(machineId, channelId, value){
	return {
		type: CHANGE_PITCH_TO_AMOUNT,
		channelId,
		machineId,
		value
	};
}

export function changeDecayToAmount(machineId, channelId, value){
	return {
		type: CHANGE_DECAY_TO_AMOUNT,
		channelId,
		machineId,
		value
	};
}

export function changePanToAmount(machineId, channelId, value){
	return {
		type: CHANGE_PAN_TO_AMOUNT,
		channelId,
		machineId,
		value
	};
}

export function toggleReverb(machineId, channelId, value){
	return {
		type: TOGGLE_REVERB,
		channelId,
		machineId,
		value
	};
}

export function changeSelectedChannel(machineId, newChannelId) {
	return {
		type: CHANGE_SELECTED_CHANNEL,
		machineId,
		value: newChannelId
	};
}

export function changeSelectedSound(machineId, channelId, newSoundId) {
	return {
		type: CHANGE_SELECTED_SOUND,
		machineId,
		channelId,
		value: newSoundId
	};
}

export function toggleSoloChannel(machineId, channelId) {
	return {
		type: TOGGLE_SOLO_CHANNEL,
		machineId,
		value: channelId
	};
}

export function toggleMuteChannel(machineId, channelId) {
	return {
		type: TOGGLE_MUTE_CHANNEL,
		machineId,
		value: channelId
	};
}

export function toggleBeat(machineId, channelId, bankId, index, value) {
  return {
		type: TOGGLE_BEAT_STATE,		
		machineId,
		channelId,
		bankId,
		index,
    value
  };
}

export function newBankIndex(machineId, bankId) {
	return {
		type: NEW_BANK_INDEX,		
		machineId,
    value: bankId
  };
}

export function changeSwingToAmount(machineId, value) {
  return {
		type: CHANGE_SWING_TO_AMOUNT,
		machineId,
    value
  };
}