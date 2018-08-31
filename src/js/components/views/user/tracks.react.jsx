import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../../actions/root.actions";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../../dropdown/dropdown.react.jsx";
import moment from "moment";
import { buildTrackRoute } from "../../../library/routing/routing";

const TracksList = props => {
  let { tracks: { tracks }, match, dispatch } = props;
  let userId = getValueFromPath(match, "params/userId");
  let userTracks = getValueFromPath(tracks, userId) || [];
  let trackActions = bindActionCreators(DrumMachineActions.tracks, dispatch);
  return userTracks.length ? 
  (<div className="large-list">
    <h2>Tracks</h2>
    <ul>
      {
         userTracks.map(track => {
          //TODO: set default track title at db level
          let title = getValueFromPath(track, "meta/title") || "Untitled Track";
          //TODO: set default date at db level
          let updatedDate = getValueFromPath(track, "meta/updatedDate") || "2017-12-01T00:00:00.000Z";
          let updatedMoment = moment(updatedDate).fromNow();
          let trackId = getValueFromPath(track, "track/trackId");
          return <li key={trackId} className="highlight">
            <Link to={buildTrackRoute(userId, trackId)} className="list-item-title">
              <div className="title">{ title }</div> <div className="meta date">{ updatedMoment }</div>
            </Link>
            <DropDownMenu items={[{
              name: "Select Track",
              link: buildTrackRoute(userId, trackId)
            },{
              name: "Delete Track",
              callback: () => trackActions.deleteTrack(),
              condition: () => false //TODO: implement track delete
            }]} />
          </li>;
        })
      }
    </ul>
  </div>
  ) : (
    <TracksEmpty {...props} />
  )
}

const TracksLoading = props => {
  return <div className="status loading">
    <span className="icon icon__loading"></span>
    <p>Loading Tracks</p>
  </div>
};

const TracksEmpty = props => {
  return <div className="status error">
    <p>There were no tracks found for this user.</p>
  </div>
};

class Tracks extends Component {
  render(){
    let { props } = this;
    let TrackState = this.getTrackStateFromProps(props);
    return <View {...props} view={{ name: "tracks" }}>
      <div className="container">
        <TrackState {...props} />
      </div>
    </View>;
  }

  getTrackStateFromProps(props) {
    let state = getValueFromPath(props, "tracks/state");
    switch(state) {
      case "idle":
      case "loading":
        return TracksLoading;
      default:
        return TracksList;
    }
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Tracks);