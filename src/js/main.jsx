import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import DrumMachine from "./components/drum-machine/drum.machine.react.jsx";
import { Login } from "./components/user/login.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/user/login" component={Login} />
				<Route path="/" component={DrumMachine} />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById("drum-machine")
);