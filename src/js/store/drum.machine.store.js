import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/drum.machine.root.reducer";
import { supplyAudioContext } from "../middleware/audio.context";
import { supplySoundBuffers } from "../middleware/load.sounds";
import { sequencer } from "../middleware/scheduler";
import { createBuffer } from "../middleware/buffer";

export default function configureStore(initialState) {
	let createStoreWithMiddleware = applyMiddleware(supplyAudioContext, supplySoundBuffers, sequencer(), createBuffer)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}