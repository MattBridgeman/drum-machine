import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import drumMachine from "./drum.machine.reducer";
import tempo from "./tempo.reducer";
import sounds from "./sounds.reducer";
import librarySounds from "./library.sounds.reducer";
import playState from "./play.state.reducer";
import reverb from "./reverb.reducer";
import buffer from "./buffer.reducer";
import auth from "./auth.reducer";
import notifications from "./notifications.reducer";
import instruments from "./instruments.reducer";
import connections from "./connections.reducer";
import track from "./track.reducer";
import meta from "./meta.reducer";

const rootReducer = combineReducers({
	tempo,
	sounds,
	librarySounds,
	drumMachine,
	playState,
	reverb,
	buffer,
	auth,
	notifications,
	instruments,
	connections,
	track,
	meta,
	router: routerReducer
});

export default rootReducer;