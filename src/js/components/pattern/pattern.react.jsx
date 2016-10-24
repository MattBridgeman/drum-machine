import * as React from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/drum.machine.actions";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, playState, patterns, dispatch } = this.props;
		const patternsActions = bindActionCreators(DrumMachineActions.patterns, dispatch);
		return (
			<div className="pattern">
				<div className="time-signature">
					<div className="time-signature-4-4">
						<span className="signature-item">1</span>
						<span className="signature-item">2</span>
						<span className="signature-item">3</span>
						<span className="signature-item">4</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">5</span>
						<span className="signature-item">6</span>
						<span className="signature-item">7</span>
						<span className="signature-item">8</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">9</span>
						<span className="signature-item">10</span>
						<span className="signature-item">11</span>
						<span className="signature-item">12</span>
					</div>
					<div className="time-signature-4-4">
						<span className="signature-item">13</span>
						<span className="signature-item">14</span>
						<span className="signature-item">15</span>
						<span className="signature-item">16</span>
					</div>
				</div>
				<div className="pattern-tray">
					{ channels
						.filter((channel, i) => channel.selected)
						.map((channel, i) => 
							patterns[channel.patterns[playState.currentBarIndex]]
							.map((beat, index) => 
								<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => patternsActions.toggleBeat(channel.patterns[playState.currentBarIndex], !beat, index)} />
							)
						)
					}
				</div>
			</div>
		);
	}

}

Pattern.propTypes = {
};

export { Pattern };