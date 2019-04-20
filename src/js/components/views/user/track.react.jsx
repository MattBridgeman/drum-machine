import React, { Component } from "react";
import { connect } from "react-redux";
import { Instrument } from "../../instrument/instrument.react.jsx";
import { View } from "../view.react.jsx";

class Track extends Component {
  render(){
    let { props } = this;
    return <View {...props} view={{ name: "track" }}>
      <div className="container">
        {props && props.track && props.track.state === "loading" ? (
          <div className="status loading">
            <span className="icon icon__loading"></span>
            <p>Loading Track</p>
          </div>
        ) : (
        <div className="">
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