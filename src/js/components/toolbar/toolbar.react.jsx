// import { WebAudioContext } from "../../audio-api/context";
// import { Tempo } from "../../audio-api/tempo";
// import { Sequencer } from "../../audio-api/sequencer";
// import { arrayBuffer } from "../../request/arraybuffer";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DrumMachineActions from "../../actions/drum.machine.actions";

import { Display } from "../display/display.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { PlayToggle } from "../play-toggle/play.toggle.react.jsx";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { getPatternBanksArray } from "../../reducers/patterns.reducer";
import { Reverb } from "./reverb/reverb.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

class Toolbar extends Component {

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
          <Slider min={50} max={190} step={1} onValueChange={ (value) => tempoActions.changeBPMToAmount(value) } />
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
    );
  }
}

export { Toolbar };