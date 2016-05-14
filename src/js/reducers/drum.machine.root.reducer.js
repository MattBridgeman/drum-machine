import { combineReducers } from "redux";
import channels from "./channels.reducer";
import tempo from "./tempo.reducer";
import sounds from "./sounds.reducer";
import patterns from "./patterns.reducer";
import beats from "./beats.reducer";
import playState from "./play.state.reducer";

const rootReducer = combineReducers({
	tempo,
	sounds,
	patterns,
	beats,
	channels,
	playState
});

export default rootReducer;