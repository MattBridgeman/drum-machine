import React from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { numberToArrayLength } from "../../library/natives/array";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { channels, playState, machineId, tempo, dispatch } = this.props;
		const drumMachineActions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
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
												.map((channel, i) => ({
													id: i,
													channel
												}))
												.filter(({ channel }, i) => channel.selected)
												.map(({ channel: { patterns }, id }, i) => 
													patterns[playState.currentBarIndex]
													.filter((beat, index) => segments.indexOf(index) !== -1)
													.map((beat, index) => ({beat, index: segments[index]}))
													.map(({beat, index}) => 
														<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => drumMachineActions.toggleBeat(machineId, id, playState.currentBarIndex, index, beat ? 0 : 1)} />
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

export { Pattern };