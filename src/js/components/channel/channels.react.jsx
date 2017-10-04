import React from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { ChannelHead } from "./channel.head.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";

class Channels extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, playState, sounds, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const channelActions = bindActionCreators(DrumMachineActions.channel, dispatch);
    return (
      <div className="channels-container">
        <div className="channels">
          {channels.map((channel, i) =>
            <div className={"channel " + (channel.selected ? "selected" : "")} ref="channel">
              <ChannelHead
                name={sounds[channel.sound].name}
                selected={channel.selected}
                solo={channel.solo}
                onSelectClick={() => channelActions.changeSelectedChannel(i)} 
                onSoloClick={() => channelActions.toggleSoloChannel(i)}
                onMuteClick={() => channelActions.toggleMuteChannel(i)} muted={channel.mute} />
              <div className="channel-tray">
                <Rotator name="Volume" value={channel.volume} onKnobRotate={ (amount) => channelActions.changeVolumeToAmount(i, amount) } onValueChange={ (value) => channelActions.changeVolumeToAmount(i, value) } />
                <Rotator name="Pitch" value={channel.pitch} onKnobRotate={ (amount) => channelActions.changePitchToAmount(i, amount) } onValueChange={ (value) => channelActions.changePitchToAmount(i, value) } />
                <Rotator name="Decay" value={channel.decay} onKnobRotate={ (amount) => channelActions.changeDecayToAmount(i, amount) } onValueChange={ (value) => channelActions.changeDecayToAmount(i, value) } />
                <Rotator name="Pan" value={channel.pan} onKnobRotate={ (amount) => channelActions.changePanToAmount(i, amount) } onValueChange={ (value) => channelActions.changePanToAmount(i, value) } />
              </div>
              <div className="channel-item">
                <h3 ref="name" className="item-title light">FX</h3>
              </div>
              <div className="channel-tray">
                <div className="toggle-button-item">
                  <h3 className="item-label">Reverb</h3>
                  <ToggleButton classes="channel-item red" selected={channel.reverb} onClick={ (amount) => channelActions.toggleReverb(i, amount) } />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export { Channels };