import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/drum.machine.root.reducer";
import middleware from "../middleware/middleware";

export default function configureStore(initialState) {
	let createStoreWithMiddleware = middleware(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}