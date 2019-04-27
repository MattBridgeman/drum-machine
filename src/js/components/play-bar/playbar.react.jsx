import React, { PureComponent } from "react";
import { Maybe } from "../maybe/maybe.react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE } from "../../constants/tempo.constants";
import { Slider } from "../slider/slider.react";
import { Modal } from "../modal/modal.react";
import { InstrumentSelector } from "../instrument/instrument.react";
import { Tray } from "../tray/tray.react";

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
};

const InstrumentChanger = ({ instruments, onChange, onNewInstrument }) => {
  return <div className="play-bar__instruments">
    <span className="play-bar__label">Instruments</span>
    <Tray title="Instruments" icon="folder" trigger={({ onOpen }) => 
      <button className="play-bar__instruments__button" onClick={onOpen}>
        <span className="assistive">Instruments</span>
        <span className="icon icon__icon-instruments"></span>
      </button>
    }>
      { ({ onClose }) => 
        <InstrumentSelector instruments={instruments} onChange={(id, type, machineId, index) => {
          onChange(id, type, machineId, index);
          onClose();
        }} onNewInstrument={(type) => {
          onNewInstrument(type);
          onClose();
        }} />
      }
    </Tray>
  </div>
};

class PlayBar extends PureComponent {
  render(){
		const { tempo, playState, instruments, dispatch } = this.props;
		const playStateActions = bindActionCreators(DrumMachineActions.playState, dispatch);
		const tempoActions = bindActionCreators(DrumMachineActions.tempo, dispatch);
		const instrumentsActions = bindActionCreators(DrumMachineActions.instruments, dispatch);
    return <div className="play-bar">
      <PlayBarPlayPause isPlaying={playState.isPlaying} onClick={playStateActions.togglePlayPause} />
      <PlayBarTempo beatsPerMinute={tempo.beatsPerMinute} onChange={tempoActions.changeBPMToAmount} />
      <InstrumentChanger instruments={instruments} onChange={instrumentsActions.changeInstrument} onNewInstrument={instrumentsActions.onNewInstrument} />
    </div>;
  }
};

export { PlayBar };