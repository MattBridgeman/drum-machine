import React, { Component } from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Modal } from "../modal/modal.react.jsx";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { objectToArrayWithKeyValue } from "../../library/natives/array";

class ChangeChannelSound extends Component {
  
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
        <ul className="generic-list">
          {
            librarySoundsList.map(({
              key: id,
              value: { name }
            }) => {
              let selected = "" + id === "" + this.state.selectedId;
              return <li>
                <label>
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

class Channels extends Component {

	constructor(props) {
		super(props);
	}

	render() {
    const { machine, machineId, playState, sounds, dispatch } = this.props;
    const { channels } = machine;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
    const actions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
    return (
      <div className="channels-container">
        <div className="channels">
          {channels.map((channel, i) => {
            let { name } = sounds[channel.sound];
            let { selected, solo, mute, sound: soundId } = channel;
            let onSelectClick = () => actions.changeSelectedChannel(machineId, i);
            let onSoloClick = () => actions.toggleSoloChannel(machineId, i);
            let onMuteClick = () => actions.toggleMuteChannel(machineId, i);
            return <div className={"channel " + (channel.selected ? "selected" : "")} ref="channel">
              <div className="channel-head">
                <div className="channel-item">
                  <div className="channel-title">
                    <h3 ref="name">
                      { name }
                    </h3>
                    <ChangeChannelSound {...this.props} channel={channel} soundId={soundId} onSoundChange={(id) => console.log("sound change:", id)} />
                  </div>
                </div>
                <ToggleButton ref="toggleButton" classes="channel-item select-button" selected={selected} name="Select" onClick={onSelectClick} />
                <div className="channel-tray">
                  <ToggleButton ref="soloButton" classes="channel-item green" selected={solo} name="Solo" onClick={onSoloClick} />
                  <ToggleButton ref="muteButton" classes="channel-item red" selected={mute} name="Mute" onClick={onMuteClick} />
                </div>
              </div>
              <div className="channel-tray">
                <Rotator name="Volume" value={channel.volume} onValueChange={ (value) => actions.changeVolumeToAmount(machineId, i, value) } />
                <Rotator name="Pitch" value={channel.pitch} onValueChange={ (value) => actions.changePitchToAmount(machineId, i, value) } />
                <Rotator name="Decay" value={channel.decay} onValueChange={ (value) => actions.changeDecayToAmount(machineId, i, value) } />
                <Rotator name="Pan" value={channel.pan} onValueChange={ (value) => actions.changePanToAmount(machineId, i, value) } />
              </div>
              <div className="channel-item">
                <h3 ref="name" className="item-title light">FX</h3>
              </div>
              <div className="channel-tray">
                <div className="toggle-button-item">
                  <h3 className="item-label">Reverb</h3>
                  <ToggleButton classes="channel-item red" selected={channel.reverb} onClick={ (amount) => actions.toggleReverb(machineId, i, amount) } />
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export { Channels };