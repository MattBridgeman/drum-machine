import { combineReducers } from "redux";
import drumMachine from "./drum.machine.reducers";
import tempo from "./tempo.reducer";

const rootReducer = combineReducers({
	tempo,
	drumMachine
});

export default rootReducer;