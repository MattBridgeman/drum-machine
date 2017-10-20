import React, { Component } from "react";
import { connect } from "react-redux";
import { Instrument } from "../instrument/instrument.react.jsx";
import { View } from "./view.react.jsx";

class Track extends Component {
  render(){
    let { props } = this;
    return <View {...props} view={{ name: "track" }}>
      <div className="container">
        <Instrument {...props} />
      </div>
    </View>;
  }
	componentWillReceiveProps(nextProps){
		let { pathname } = this.props.location;
		let { pathname: nextPathname } = nextProps.location;
    if(this.isNewPath(pathname, nextPathname)
      && this.matchesTrackRoute(this.props.match.path)
      && this.isNewTrack(nextProps.props.match.params.trackId)) {
      alert("new track!");
    }
	}
	componentDidMount(){
		alert("TestTrackRoute: mount");
  }
  isNewPath(oldPath, newPath) {
    return oldPath !== newPath;
  }
  isNewTrack(newId = "default"){
    let { props: { track: trackId } } = this;
    return newId !== trackId;
  }
  matchesTrackRoute(route){
    return route === "/users/:userId/tracks/:trackId"
      || route === "/";
  }
};

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(Track);