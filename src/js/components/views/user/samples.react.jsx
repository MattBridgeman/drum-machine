import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../../dropdown/dropdown.react.jsx";

class SamplesList extends Component {
  render(){
    return null;
  }
};

class Samples extends Component {
  render(){
    let { props } = this;
    return <View {...props} view={{ name: "samples" }}>
      <div className="container">
        <SamplesList {...props} />
      </div>
    </View>;
  }
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Samples);