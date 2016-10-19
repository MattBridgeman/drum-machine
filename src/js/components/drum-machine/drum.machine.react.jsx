// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

import { Display } from "../display/display.react.jsx";
import { PlayHeading } from "../play-heading/play.heading.react.jsx";
import { Channel } from "../channel/channel.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { SourceSelector } from "../source-selector/source.selector.react.jsx";
import { ValueSelector } from "../value-selector/value.selector.react.jsx";
import { Pattern } from "../pattern/pattern.react.jsx";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { PlayToggle } from "../play-toggle/play.toggle.react.jsx";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { getPatternBanksArray } from "../../reducers/patterns.reducer";
import { Reverb } from "./reverb/reverb.react.jsx";

class DrumMachine extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, tempo, playState, sounds, patterns, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
		const patternsActions = bindActionCreators(DrumMachineActions.patterns, dispatch);
		const channelActions = bindActionCreators(DrumMachineActions.channel, dispatch);
		
		return (
			<div className="drum-machine">
				<div className="toolbar">
					<div className="toolbar-item play-pause">
						<PlayToggle isPlaying={ playState.isPlaying } onPlayPause={ playStateActions.togglePlayPause } />
					</div>
					<div className="toolbar-item tempo-display">
						<div className="display">
							<div className="sleeve">
								<h3 className="item-title light">Tempo</h3>
								<div className="inner">
									<span className="value">{tempo.beatsPerMinute}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="toolbar-item tempo">
						<Rotator name="Tempo" value={tempo.beatsPerMinute} min={50} max={190} onKnobRotate={ (amount) => tempoActions.changeBPMToAmount(amount) } onValueChange={ (value) => tempoActions.changeBPMToAmount(value) } />
					</div>
					<div className="toolbar-item swing">
						<Rotator name="Swing" value={tempo.swing} onKnobRotate={ (amount) => tempoActions.changeSwingToAmount(amount) } onValueChange={ (value) => tempoActions.changeSwingToAmount(value) } />
					</div>
					<div className="toolbar-item bank-selector">
						<h3 className="item-title light">Pattern Bank</h3>
						<div className="banks-available">
							{ getPatternBanksArray()
								.map(i => 
									<ToggleButton onClick={() => playStateActions.newBarIndex(i)} name={"A" + (i + 1)} selected={i === playState.currentBarIndex} classes="red" />
								)
							}
						</div>
					</div>
					<div className="toolbar-item reverb">
						<Reverb {...this.props} />
					</div>
				</div>
				<div className="channels">
					{channels.map((channel, i) =>
						<Channel name={sounds[channel.sound].name} selected={channel.selected} solo={channel.solo} onSelectClick={() => channelActions.changeSelectedChannel(i)}  onSoloClick={() => channelActions.toggleSoloChannel(i)}  onMuteClick={() => channelActions.toggleMuteChannel(i)} muted={channel.mute}>
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
						</Channel>
					)}
				</div>
				<Pattern>
					{ channels
						.filter((channel, i) => channel.selected)
						.map((channel, i) => 
							patterns[channel.patterns[playState.currentBarIndex]].map((beat, index) => 
								<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => patternsActions.toggleBeat(channel.patterns[playState.currentBarIndex], !beat, index)} />
							)
						)
					}
				</Pattern>
		</div>
		);
	}

}

function mapStateToProps(state) {
	//return state.drumMachine;
	return state;
}

export default connect(mapStateToProps)(DrumMachine);