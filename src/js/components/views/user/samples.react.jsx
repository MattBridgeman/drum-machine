import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../../dropdown/dropdown.react.jsx";
import { objectToArrayWithKeyValue } from "../../../library/natives/array";
import { Modal } from "../../modal/modal.react.jsx";

class SamplesList extends Component {
  render(){
    let { samples, match } = this.props;
    let userId = getValueFromPath(match, "params/userId");
    let userSamples = getValueFromPath(samples, `samples/${userId}`) || {};
    let userSamplesList = objectToArrayWithKeyValue(userSamples);
    return <div className="large-list">
      <h2>Samples</h2>
      <div className="upload-a-sample">
        <Modal title="Upload a sample" text="Upload a sample">
          {
            props => (
              <div>foo</div>
            )
          }
        </Modal>
      </div>
      <ul>
      {
        userSamplesList.length ? userSamplesList.map(({
          key: id,
          value: { name }
        }) => {
          return <li>
            <span className="list-item-title">{name}</span>
          </li>;
        }) : null
      }
      </ul>
    </div>;
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