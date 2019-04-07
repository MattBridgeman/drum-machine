import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../../actions/root.actions";
import { Instrument } from "../../instrument/instrument.react.jsx";
import { View } from "../view.react.jsx";
import { PlayToggle } from "../../play-toggle/play.toggle.react.jsx";

class Track extends Component {
  render(){
    let { props } = this;
		const { playState, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
    return <View {...props} view={{ name: "track" }}>
      <div className="container">
        {props && props.track && props.track.state === "loading" ? (
          <div className="status loading">
            <span className="icon icon__loading"></span>
            <p>Loading Track</p>
          </div>
        ) : (
        <div className="">
          <PlayToggle isPlaying={ playState.isPlaying } onPlayPause={ playStateActions.togglePlayPause } />
          <Instrument {...props} />
        </div>
        )}
      </div>
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Track);