import { dispatcher } from "../dispatcher/drum.machine.dispatcher";
import { DrumMachineConstants } from "../constants/drum.machine.constants";
import { EventEmitter } from "events";
import * as assign from "object-assign";

var DrumMachineStore = assign({}, EventEmitter.prototype, {
	data: {
		tempo: {
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		},
		selectedSoundIndex: 0,
		sounds: [{
			name: "kick",
			path: "samples/808/01_KCK1.WAV"
		}, {
			name: "clap",
			path: "samples/808/15_CLP2.WAV"
		}],
		patterns: [{
			name: "kick",
			patterns: [
				[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0]
			]
		}, {
			name: "kick",
			patterns: [
				[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1]
			]
		}],
		state: {
			isPlaying: false
		}
	}
});

dispatcher.register(function(action) {
	switch(action.actionType) {
		case DrumMachineConstants.PLAY:
		  DrumMachineStore.data.state.isPlaying = true;
		  DrumMachineStore.emit(DrumMachineConstants.CHANGE_EVENT);
		  break;
		case DrumMachineConstants.PAUSE:
		  DrumMachineStore.data.state.isPlaying = false;
		  DrumMachineStore.emit(DrumMachineConstants.CHANGE_EVENT);
		  break;
		case DrumMachineConstants.TOGGLE_PLAY_PAUSE:
		  DrumMachineStore.data.state.isPlaying = !DrumMachineStore.data.state.isPlaying;
		  DrumMachineStore.emit(DrumMachineConstants.CHANGE_EVENT);
		  break;
	}
});

export { DrumMachineStore };