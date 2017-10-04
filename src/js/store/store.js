import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root.reducer";
import middleware from "../middleware/middleware";

export default function configureStore(initialState) {
	let createStoreWithMiddleware = middleware(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
	return store;
}