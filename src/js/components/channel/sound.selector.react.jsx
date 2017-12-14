import React, { Component } from "react";
import { Modal } from "../modal/modal.react.jsx";
import { objectToArrayWithKeyValue } from "../../library/natives/array";

class SoundSelector extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedId: this.props.soundId
    };
  }

  soundHasChanged(){
    return this.state.selectedId !== this.props.soundId;
  }

  onChange(value) {
    this.setState({
      selectedId: value
    });
  }

  render(){
    const { librarySounds, channel, soundId, onSoundChange } = this.props;
    const librarySoundsList = objectToArrayWithKeyValue(librarySounds);
    return <Modal {...this.props} title="Change Sound" icon="folder">
      <div className="sound-selector">
        <div className="tabs">
          <h4>Library Sounds</h4>
        </div>
        <ul className="generic-list striped">
          {
            librarySoundsList.map(({
              key: id,
              value: { name }
            }) => {
              let selected = "" + id === "" + this.state.selectedId;
              return <li>
                <label className="choice-item">
                  <input type="radio" name="sound-choice" value={id} checked={selected} onChange={(event) => this.onChange(event.target.value)} />
                  <span>{name}</span>
                  <span className="assistive">{selected ? " - Selected" : ""}</span>
                </label>
              </li>;
            }
          )}
        </ul>
        <div className="button-tray">
          <button className="button" onClick={() => onSoundChange(this.state.selectedId)} disabled={!this.soundHasChanged()}>Update</button>
        </div>
      </div>
    </Modal>;
  }
}