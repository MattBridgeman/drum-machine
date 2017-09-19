import { combineReducers } from "redux";
import channels from "./channels.reducer";
import tempo from "./tempo.reducer";
import sounds from "./sounds.reducer";
import patterns from "./patterns.reducer";
import playState from "./play.state.reducer";
import reverb from "./reverb.reducer";
import buffer from "./buffer.reducer";
import auth from "./auth.reducer";

const rootReducer = combineReducers({
	tempo,
	sounds,
	patterns,
	channels,
	playState,
	reverb,
	buffer,
	auth
});

export default rootReducer;