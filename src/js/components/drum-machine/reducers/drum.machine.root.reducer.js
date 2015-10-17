import { combineReducers } from "redux";
import channels from "./channels.reducer";
import tempo from "./tempo.reducer";
import sounds from "./sounds.reducer";
import transformers from "./transformers.reducer";
import patterns from "./transformers.reducer";
import beats from "./beats.reducer";

const rootReducer = combineReducers({
	tempo,
	sounds,
	transformers,
	patterns,
	beats,
	channels
});

export default rootReducer;