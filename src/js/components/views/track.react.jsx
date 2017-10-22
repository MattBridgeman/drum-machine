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
    let { trackId, userId } = nextProps.match.params;
    if(this.isNewPath(pathname, nextPathname)
      && this.matchesTrackRoute(nextProps.match.path)
      && this.isNewTrack(trackId)) {
        this.onNewTrack(nextProps);
    }
	}
	componentDidMount(){
		if(this.matchesTrackRoute(this.props.match.path)
      && this.isNewTrack(this.props.match.params.trackId)) {
        this.onNewTrack(this.props);
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
  onNewTrack(props) {
    let { trackId, userId, dispatch } = props;
    const trackActions = bindActionCreators(DrumMachineActions.track, dispatch);
    trackActions.newTrackLoading(userId, trackId);
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Track);