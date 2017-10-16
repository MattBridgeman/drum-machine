import React, { Component } from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";

import { Display } from "../display/display.react.jsx";
import { Rotator } from "../rotator/rotator.react.jsx";
import { PlayToggle } from "../play-toggle/play.toggle.react.jsx";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";
import { numberToArrayLength } from "../../library/natives/array";
import { Reverb } from "./reverb/reverb.react.jsx";
import { Slider } from "../slider/slider.react.jsx";

class Toolbar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { tempo, playState, sounds, dispatch, machine, machineId } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
		const channelActions = bindActionCreators(DrumMachineActions.channel, dispatch);
    const drumMachineActions = bindActionCreators(DrumMachineActions.channel, dispatch);
    const { currentBankIndex } = machine;
		
		return (
      <div className="toolbar">
        <div className="toolbar-item play-pause">
          <PlayToggle isPlaying={ playState.isPlaying } onPlayPause={ playStateActions.togglePlayPause } />
        </div>
        <div className="toolbar-item tempo">
          <Slider name="Tempo" min={50} max={190} step={1} value={tempo.beatsPerMinute} onValueChange={ (value) => tempoActions.changeBPMToAmount(value) } />
        </div>
        <div className="toolbar-item swing">
          <Slider name="Swing" min={0} max={100} step={5} value={tempo.swing} onValueChange={ (value) => drumMachineActions.changeSwingToAmount(machineId, value) } />
        </div>
        <div className="toolbar-item bank-selector">
          <h3 className="item-label">Pattern Bank</h3>
          <div className="banks-available">
            { numberToArrayLength(8)
              .map(i =>
                <ToggleButton onClick={() => drumMachineActions.newBankIndex(machineId, i)} name={"A" + (i + 1)} selected={i === currentBankIndex} classes="red" />
              )
            }
          </div>
        </div>
        <div className="toolbar-item reverb">
          <Reverb machineId={0} {...this.props} />
        </div>
      </div>
    );
  }
}

export { Toolbar };