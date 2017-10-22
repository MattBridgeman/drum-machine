import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/root.actions";
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
    let { trackId, userID } = nextProps.match.params;
    if(this.isNewPath(pathname, nextPathname)
      && this.matchesTrackRoute(nextProps.match.path)
      && this.isNewTrack(trackId)) {
        const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
        trackActions.newTrack(userId, trackId);
    }
	}
	componentDidMount(){
		if(this.matchesTrackRoute(this.props.match.path)
      && this.isNewTrack(this.props.match.params.trackId)) {
      alert("new track!");
    }
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