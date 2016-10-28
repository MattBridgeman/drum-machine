import * as React from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/drum.machine.actions";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { numberToArrayLength } from "../../library/natives/array";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, playState, patterns, tempo, dispatch } = this.props;
		const patternsActions = bindActionCreators(DrumMachineActions.patterns, dispatch);
		return (
			<div className="pattern">
				<div className="time-signature">
					{
						numberToArrayLength(tempo.beatsPerBar)
							.map(beatIndex => {
								let segments = numberToArrayLength(tempo.segmentsPerBeat, beatIndex * tempo.segmentsPerBeat);
								return ( 
									<div className="time-signature-group">
										<div className="time-signature-4-4">
											{ segments
												.map(segmentIndex =>
													<span className="signature-item">{segmentIndex + 1}</span>
												)
											}
										</div>
										<div className="pattern-tray">
											{ channels
												.filter((channel, i) => channel.selected)
												.map((channel, i) => 
													patterns[channel.patterns[playState.currentBarIndex]]
													.filter((beat, index) => segments.indexOf(index) !== -1)
													.map((beat, index) => ({beat, index: segments[index]}))
													.map(({beat, index}) => 
														<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => patternsActions.toggleBeat(channel.patterns[playState.currentBarIndex], !beat, index)} />
													)
												)
											}
										</div>
									</div>
								)
							}
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