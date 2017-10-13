import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root.reducer";

export default function configureStore(initialState) {
	// let createStoreWithMiddleware = applyMiddleware()(createStore);
	const store = createStore(rootReducer, initialState);
	return store;
}