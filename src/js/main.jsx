import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import Track from "./components/views/track.react.jsx";
import Login from "./components/views/user/login.react.jsx";
import Logout from "./components/views/user/logout.react.jsx";
import { Provider } from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

class TestTrackRoute extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return <div>
			<Link to="/">Default</Link>
			<br/>
			<Link to="/users/1234/tracks/123">User: 1234, Track: 123</Link>
			<Link to="/users/1234/tracks/1234">User: 1234, Track: 1234</Link>
		</div>;
	}
	componentWillReceiveProps(nextProps){
		let { pathname } = this.props.location;
		let { pathname: nextPathname } = nextProps.location;
		if(pathname !== nextPathname) {
			alert("TestTrackRoute: Route change!");
		}
	}
	componentDidMount(){
		alert("TestTrackRoute: mount");
	}
};

class TestDefaultRoute extends React.Component {
	render(){
		return <div>
			<Link to="/">Default</Link>
			<br/>
			<Link to="/users/1234/tracks/123">User: 1234, Track: 123</Link>
			<Link to="/users/1234/tracks/1234">User: 1234, Track: 1234</Link>
		</div>;
	}
	componentWillReceiveProps(nextProps){
		let { pathname } = this.props.location;
		let { pathname: nextPathname } = nextProps.location;
		if(pathname !== nextPathname) {
			alert("TestTrackRoute: Route change!");
		}
	}
	componentDidMount(){
		alert("TestDefaultRoute: mount");
	}
};

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/user/login" component={ Login } />
				<Route path="/user/logout" component={ Logout } />
				<Route path="/users/:userId/tracks/:trackId" component={ TestTrackRoute } />
				<Route path="/" component={ TestDefaultRoute } />
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById("app")
);