import React from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Modal } from "../modal/modal.react.jsx";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { objectToArrayWithKeyValue } from "../../library/natives/array";

class Channels extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
    const { machine, machineId, playState, sounds, librarySounds, dispatch } = this.props;
    const { channels } = machine;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
    const actions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
    const librarySoundsList = objectToArrayWithKeyValue(librarySounds);
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
                    <Modal {...this.props} title="Change Sound" icon="folder">
                      <div className="sound-selector">
                        <h4>Library Sounds</h4>
                        <ul className="generic-list">
                          {
                            librarySoundsList.map(({
                              key: id,
                              value: { name }
                            }) => {
                              let selected = "" + id === "" + soundId;
                              let inputId = "sound-choice-" + id;
                              return <li>
                                <label for={inputId}>
                                  <input type="radio" id={inputId} name="sound-choice" value={id} checked={selected} />
                                  <span>{name}</span>
                                  <span className="assistive">{selected ? " - Selected" : ""}</span>
                                </label>
                              </li>;
                            }
                          )}
                        </ul>
                      </div>
                    </Modal>
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