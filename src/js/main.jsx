import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import Track from "./components/views/user/track.react.jsx";
import Tracks from "./components/views/user/tracks.react.jsx";
import Samples from "./components/views/user/samples.react.jsx";
import Login from "./components/views/user/login.react.jsx";
import Logout from "./components/views/user/logout.react.jsx";
import configureStore from "./store/store";
import { history } from "./middleware/history";

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