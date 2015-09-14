import * as React from "react";
import DrumMachine from "./components/drum-machine/drum.machine.react.jsx";
import { Provider } from 'react-redux';
import configureStore from './components/drum-machine/store/drum.machine.store';

const store = configureStore();

React.render(
	<Provider store={store}>
		{() => <DrumMachine />}
	</Provider>,
	document.getElementById("drum-machine")
);