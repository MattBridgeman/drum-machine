import { combineReducers } from "redux";
import drumMachine from "./drum.machine.reducer";
import tempo from "./tempo.reducer";
import sounds from "./sounds.reducer";
import patterns from "./patterns.reducer";
import playState from "./play.state.reducer";
import reverb from "./reverb.reducer";
import buffer from "./buffer.reducer";
import auth from "./auth.reducer";
import notifications from "./notifications.reducer";
import instruments from "./instruments.reducer";
import connections from "./connections.reducer";

const rootReducer = combineReducers({
	tempo,
	sounds,
	patterns,
	drumMachine,
	playState,
	reverb,
	buffer,
	auth,
	notifications,
	instruments,
	connections
});

export default rootReducer;