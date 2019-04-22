import React, { PureComponent } from "react";
import { Maybe } from "../maybe/maybe.react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";

const PlayBarPlayPause = ({ isPlaying, onClick }) => {
  return <button class="play-bar__play-pause" onClick={onClick}>
    <Maybe condition={isPlaying}>
      <span className="icon icon__pause-light"></span>
      <span className="play-bar__play-pause__label">Pause</span>
    </Maybe>
    <Maybe condition={!isPlaying}>
      <span className="icon icon__play-light"></span>    
      <span className="play-bar__play-pause__label">Play</span>  
    </Maybe>
  </button>
};

class PlayBar extends PureComponent {
  render(){
		const { tempo, playState, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
    const drumMachineActions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
    return <div className="play-bar">
      <PlayBarPlayPause isPlaying={playState.isPlaying} onClick={playStateActions.togglePlayPause} />
    </div>;
  }
};

export { PlayBar };