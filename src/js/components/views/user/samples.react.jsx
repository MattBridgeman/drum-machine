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
import { uploadSample } from "../../../actions/samples.actions";
import DrumMachineActions from "../../../actions/root.actions";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const acceptedMimeTypes = ["audio/x-wav"];

class UploadSampleModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      dragover: false
    };
  }
  onDragOver(e){
    e.preventDefault(e);
    e.dataTransfer.dropEffect = "copy";
    this.setState({
      dragover: true
    });
  }
  onDragLeave(e){
    this.setState({
      dragover: false
    });
  }
  onDrop(e){
    let { dispatch } = this.props;
    e.preventDefault();
    var dt = e.dataTransfer;
    if (dt.items) {
      if (dt.items[0].kind == "file") {
        let file = dt.items[0].getAsFile();
        let { name } = file;
        let shortName = name.substring(0, 2).toUpperCase();
        dispatch(uploadSample(name, shortName, file));
      }
    } else {
      let file = dt.files[0];
      let { name } = file;
      let shortName = name.substring(0, 2).toUpperCase();
      dispatch(uploadSample(name, shortName, file));
    }
  }
  onFileInput(e){
    let { dispatch } = this.props;
    let file = e.target.files[0];
    let { name } = file;
    let shortName = name.substring(0, 2).toUpperCase();
    dispatch(uploadSample(name, shortName, file));
  }
  render(){
    let { samples, match, auth, dispatch } = this.props;
    let userId = getValueFromPath(match, "params/userId");
    let currentUserId = getValueFromPath(auth, "user/uid");
    let state = getValueFromPath(samples, "upload/state");
    let { dragover } = this.state;
		let samplesActions = bindActionCreators(DrumMachineActions.samples, dispatch);

    return <Maybe condition={userId === currentUserId}>
      <div className="upload-a-sample">
        <Modal title="Upload a sample" text="Upload a sample" trigger={({ onOpen }) => 
          <a className="cta-link" onClick={onOpen}>
            Upload a sample
          </a>
        }>
          {
            props => (
              <div className="upload-container">
                <Maybe condition={state === "idle"}>
                  <div className={"upload" + ( dragover ? " highlight" : "")}
                    onDragOver={e => this.onDragOver(e)}
                    onDragLeave={e => this.onDragLeave(e)}
                    onDrop={e => this.onDrop(e)}
                  >
                    <span className="upload-cta">Drag a file to upload here</span>
                    <label className="upload-label" htmlFor="upload">or upload a file</label>
                    <input className="upload-input" type="file" id="upload" onChange={e => this.onFileInput(e)} />
                  </div>
                </Maybe>
                <Maybe condition={state === "error"}>
                  <div className="upload error">
                    <span className="upload-cta">There was an error uploading the file</span>
                    <span className="upload-label">the following issues may have occured</span>
                    <ul>
                      <li>File was too big (1MB max)</li>
                      <li>File wasn't a WAV audio file</li>
                    </ul>
                    <a className="upload-label" onClick={() => samplesActions.samplesUploadReset()}>Try again</a>
                  </div>
                </Maybe>
                <Maybe condition={state === "uploading"}>
                  <div className="upload uploading">
                    <span className="upload-cta">Uploading...</span>
                    <span className="icon icon__loading"></span>
                  </div>
                </Maybe>
                <Maybe condition={state === "uploaded"}>
                  <div className="upload uploaded">
                    <span className="upload-cta">File Uploaded Successfully</span>
                    <span className="icon icon__tick"></span>
                    <a className="upload-label" onClick={() => samplesActions.samplesUploadReset()}>Upload another file</a>
                  </div>
                </Maybe>
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
    let { samples, match, auth, dispatch } = this.props;
    let userId = getValueFromPath(match, "params/userId");
    let currentUserId = getValueFromPath(auth, "user/uid");
    let userSamples = getValueFromPath(samples, `samples/${userId}`) || {};
    let userSamplesList = objectToArrayWithKeyValue(userSamples);
    let samplesActions = bindActionCreators(DrumMachineActions.samples, dispatch);
    return <div className="large-list">
      <h2>Samples</h2>
      <UploadSampleModal {...this.props} />
      <Maybe condition={userSamplesList.length}>
        <ul>
          {
            userSamplesList.map(({
              key: id,
              value: { name, deleted }
            }) => {
              return <li key={id} className={deleted ? "disabled" : ""}>
                <span className="list-item-title">{name}</span>
                <DropDownMenu items={[{
                  name: "Delete Sample",
                  callback: () => samplesActions.deleteSample(userId, id),
                  condition: () => userId === currentUserId
                }]} />
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