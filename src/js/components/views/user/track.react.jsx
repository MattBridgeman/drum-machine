import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Track } from "../../track/track.react.jsx";
import { View } from "../view.react.jsx";

class TrackView extends PureComponent {
  render(){
    let { props } = this;
    return <View {...props} view={{ name: "track" }}>
      {props && props.track && props.track.state === "loading" ? (
        <div className="container">
          <div className="status loading">
            <span className="icon icon__loading"></span>
            <p>Loading Track</p>
          </div>
        </div>
        ) : (
          <Track {...props} />
        )}
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(TrackView);