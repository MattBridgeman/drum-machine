import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { sequencer } from "../middleware/scheduler";
import { createBuffer } from "../middleware/buffer";

export default function configureStore(initialState) {
	let createStoreWithMiddleware = applyMiddleware(sequencer, createBuffer)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}