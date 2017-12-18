import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../../actions/root.actions";
import { View } from "../view.react.jsx";

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
        <div>here</div>
        )}
      </div>
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Tracks);