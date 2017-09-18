import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Route } from "react-router";
import DrumMachine from "./components/drum-machine/drum.machine.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Route path="/" component={DrumMachine} />
		</HashRouter>
	</Provider>,
	document.getElementById("drum-machine")
);