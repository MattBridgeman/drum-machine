import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Track from "./components/views/track.react.jsx";
import Login from "./components/views/user/login.react.jsx";
import Logout from "./components/views/user/logout.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/user/login" component={Login} />
				<Route path="/user/logout" component={Logout} />
				<Route path="/" component={Track} />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById("app")
);