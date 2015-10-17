import * as React from "react";
import ReactDOM from "react-dom";
import DrumMachine from "./components/drum-machine/drum.machine.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./components/drum-machine/store/drum.machine.store";
import { sequencer } from "./components/sequencer/sequencer";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<DrumMachine />
	</Provider>,
	document.getElementById("drum-machine")
);

sequencer(store);