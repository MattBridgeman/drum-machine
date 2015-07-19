import { dispatcher } from "../dispatcher/drum.machine.dispatcher";
import { DrumMachineConstants } from "../constants/drum.machine.constants";

var DrumMachineActions = {
	play(){
		dispatcher.emit({
			actionType: DrumMachineConstants.PLAY
		});
	},
	pause(){
		dispatcher.emit({
			actionType: DrumMachineConstants.PAUSE
		});
	},
	togglePlayPause(){
		dispatcher.emit({
			actionType: DrumMachineConstants.TOGGLE_PLAY_PAUSE
		});
	}
};

export { DrumMachineActions };