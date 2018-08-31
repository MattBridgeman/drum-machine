import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import Track from "./js/components/views/user/track.react.jsx";
import Tracks from "./js/components/views/user/tracks.react.jsx";
import Samples from "./js/components/views/user/samples.react.jsx";
import Login from "./js/components/views/user/login.react.jsx";
import Logout from "./js/components/views/user/logout.react.jsx";
import configureStore from "./js/store/store";
import { history } from "./js/middleware/history";
import './less/all.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<Switch>
				<Route path="/user/login" component={ Login } />
				<Route path="/user/logout" component={ Logout } />
				<Route path="/users/:userId/tracks/:trackId" component={ Track } />
				<Route path="/users/:userId/tracks" component={ Tracks } />
				<Route path="/users/:userId/samples" component={ Samples } />
				<Route path="/" component={ Track } />
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("app")
);