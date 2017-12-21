import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../../actions/root.actions";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";

class Tracks extends Component {
  render(){
    let { props } = this;
    let { tracks: { tracks }, match } = props;
    let userId = getValueFromPath(match, "params/userId");
    let userTracks = getValueFromPath(tracks, userId) || [];
    return <View {...props} view={{ name: "tracks" }}>
      <div className="container">
        {props && props.tracks.state === "loading" ? (
          <div className="status loading">
            <span className="icon icon__loading"></span>
            <p>Loading Tracks</p>
          </div>
        ) : (
        <ul>
          {
            userTracks.map(track => {
              let title = getValueFromPath(track, "meta/title") || "Untitled Track";
              let trackId = getValueFromPath(track, "track/trackId");
              return <li><Link to={`/users/${userId}/tracks/${trackId}`}>{ title }</Link></li>;
            })
          }
        </ul>
        )}
      </div>
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Tracks);