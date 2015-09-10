import { createStore } from 'redux';
import rootReducer from '../reducers/drum.machine.root.reducer';

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState);
	return store;
}