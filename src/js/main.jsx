import * as React from "react";
import ReactDOM from "react-dom";
import DrumMachine from "./components/drum-machine/drum.machine.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./store/drum.machine.store";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<DrumMachine />
	</Provider>,
	document.getElementById("drum-machine")
);