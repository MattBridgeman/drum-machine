import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { history } from "../middleware/history";
import drumMachine from "./drum.machine.reducer";
import tempo from "./tempo.reducer";
import librarySounds from "./library.sounds.reducer";
import playState from "./play.state.reducer";
import reverb from "./reverb.reducer";
import buffer from "./buffer.reducer";
import auth from "./auth.reducer";
import notifications from "./notifications.reducer";
import instruments from "./instruments.reducer";
import connections from "./connections.reducer";
import track from "./track.reducer";
import tracks from "./tracks.reducer";
import meta from "./meta.reducer";
import samples from "./samples.reducer";
import preview from "./preview.reducer";
import synth from "./synth.reducer";

const rootReducer = combineReducers({
	tempo,
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
	tracks,
	meta,
	samples,
	preview,
	synth,
	router: connectRouter(history)
});

export default rootReducer;