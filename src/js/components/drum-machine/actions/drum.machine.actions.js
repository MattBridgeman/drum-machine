import { dispatcher } from "../dispatcher/drum.machine.dispatcher";
import { DrumMachineConstants } from "../constants/drum.machine.constants";

var DrumMachineActions = {
	play(){
		dispatcher.dispatch({
			actionType: DrumMachineConstants.PLAY
		});
	},
	pause(){
		dispatcher.dispatch({
			actionType: DrumMachineConstants.PAUSE
		});
	},
	togglePlayPause(){
		dispatcher.dispatch({
			actionType: DrumMachineConstants.TOGGLE_PLAY_PAUSE
		});
	}
};

export { DrumMachineActions };