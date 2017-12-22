import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../../actions/root.actions";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";

const TracksList = props => {
  let { tracks: { tracks }, match } = props;
  let userId = getValueFromPath(match, "params/userId");
  let userTracks = getValueFromPath(tracks, userId) || [];
  return <ul className="tracks-list">
    {
      userTracks.map(track => {
        //TODO: set default track title at db level
        let title = getValueFromPath(track, "meta/title") || "Untitled Track";
        //TODO: set default date at db level
        let updatedDate = getValueFromPath(track, "meta/updatedDate") || "2017-12-01T00:00:00.000Z";
        let trackId = getValueFromPath(track, "track/trackId");
        return <li>
          <Link to={`/users/${userId}/tracks/${trackId}`}>
            <span className="title">{ title }</span> - <span className="date">{ updatedDate }</span>
          </Link>
        </li>;
      })
    }
  </ul>
}

class Tracks extends Component {
  render(){
    let { props } = this;
    return <View {...props} view={{ name: "tracks" }}>
      <div className="container">
        {props && props.tracks.state === "loading" ? (
          <div className="status loading">
            <span className="icon icon__loading"></span>
            <p>Loading Tracks</p>
          </div>
        ) : (
          <TracksList {...props} />
        )}
      </div>
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Tracks);