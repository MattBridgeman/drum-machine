import React, { Component } from "react";
import { Modal } from "../modal/modal.react.jsx";
import { objectToArrayWithKeyValue } from "../../library/natives/array";

class Tabs extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedTab: props.initial
    };
  }

  render() {
    let { props, state } = this;
    return <div className="tabs">
      {
        props.tabs.map(({ name, id }) => {
          let selected = state.selectedTab === id;
          return <h4 class={selected ? "selected" : ""}><a onClick={() => this.changeTab(id)}>{name}</a></h4>
        })
      }
    </div>
  }

  changeTab(id) {
    this.setState({
      selectedTab: id
    });
  }
}

class SoundSelector extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedId: this.props.soundId,
      selectedTab: "library-sounds"
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
      { ({ onClose }) => 
        <div className="sound-selector">
          <Tabs tabs={[{
            name: "Library Sounds",
            id: "library-sounds"
          }, {
            name: "Uploads",
            id: "uploads"
          }]} initial="library-sounds">

          </Tabs>
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
            <button className="button" onClick={() => { onSoundChange(this.state.selectedId); onClose();}} disabled={!this.soundHasChanged()}>Update</button>
          </div>
      </div>
      }
    </Modal>;
  }
}

export { SoundSelector };