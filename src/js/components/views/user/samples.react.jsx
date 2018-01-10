import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "../view.react.jsx";
import { getValueFromPath } from "../../../library/natives/object";
import { Link } from "react-router-dom";
import { DropDownMenu } from "../../dropdown/dropdown.react.jsx";
import { objectToArrayWithKeyValue } from "../../../library/natives/array";
import { Modal } from "../../modal/modal.react.jsx";
import { Maybe } from "../../maybe/maybe.react.jsx";

class UploadSampleModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      dragover: false
    };
  }
  onDragOver(e){
    this.setState({
      dragover: true
    });
  }
  onDragLeave(e){
    this.setState({
      dragover: false
    });
  }
  render(){
    let { samples, match, auth } = this.props;
    let userId = getValueFromPath(match, "params/userId");
    let currentUserId = getValueFromPath(auth, "user/uid");
    let { dragover } = this.state;

    return <Maybe condition={userId === currentUserId}>
      <div className="upload-a-sample">
        <Modal title="Upload a sample" text="Upload a sample">
          {
            props => (
              <div className={"upload" + ( dragover ? " highlight" : "")} onDragOver={e => this.onDragOver(e)} onDragLeave={e => this.onDragLeave(e)}>
                <span className="upload-cta">Drag a file to upload here</span>
                <label className="upload-label" htmlFor="upload">or upload a file</label>
                <input  className="upload-input" type="file" id="upload" />
              </div>
            )
          }
        </Modal>
      </div>
    </Maybe>
  }
}

class SamplesList extends Component {
  render(){
    let { samples, match, auth } = this.props;
    let userId = getValueFromPath(match, "params/userId");
    let userSamples = getValueFromPath(samples, `samples/${userId}`) || {};
    let userSamplesList = objectToArrayWithKeyValue(userSamples);
    return <div className="large-list">
      <h2>Samples</h2>
      <UploadSampleModal {...this.props} />
      <Maybe condition={userSamplesList.length}>
        <ul>
          {
            userSamplesList.map(({
              key: id,
              value: { name }
            }) => {
              return <li>
                <span className="list-item-title">{name}</span>
              </li>;
            })
          }
        </ul>
      </Maybe>
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