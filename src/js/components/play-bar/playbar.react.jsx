import React, { PureComponent } from "react";
import { Maybe } from "../maybe/maybe.react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE } from "../../constants/tempo.constants";
import { Slider } from "../slider/slider.react";

const PlayBarPlayPause = ({ isPlaying, onClick }) => {
  return <button class="play-bar__play-pause" onClick={onClick}>
    <Maybe condition={isPlaying}>
      <span className="play-bar__label">Pause</span>
      <span className="icon icon__pause-light"></span>
    </Maybe>
    <Maybe condition={!isPlaying}>
      <span className="play-bar__label">Play</span>
      <span className="icon icon__play-light"></span>
    </Maybe>
  </button>
};

const PlayBarTempo = ({ beatsPerMinute, onChange }) => {
  return <div className="play-bar__tempo">
    <span className="play-bar__label">Tempo</span>
    <Slider type="small" theme="light" min={MIN_BEATS_PER_MINUTE} max={MAX_BEATS_PER_MINUTE} step={1} value={beatsPerMinute} onValueChange={onChange} />
  </div>
}

class PlayBar extends PureComponent {
  render(){
		const { tempo, playState, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
    return <div className="play-bar">
      <PlayBarPlayPause isPlaying={playState.isPlaying} onClick={playStateActions.togglePlayPause} />
      <PlayBarTempo beatsPerMinute={tempo.beatsPerMinute} onChange={tempoActions.changeBPMToAmount} />
    </div>;
  }
};

export { PlayBar };