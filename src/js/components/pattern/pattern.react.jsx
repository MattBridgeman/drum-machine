import React from "react";
import { bindActionCreators } from "redux";
import DrumMachineActions from "../../actions/root.actions";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { numberToArrayLength } from "../../library/natives/array";
import { PatternTimeSignature } from "./pattern.time.signature.react";
import { PatternTimeSignatureGroup } from "./pattern.time.signature.react";
import { PatternTimeSignature44 } from "./pattern.time.signature.react";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { machine, playState, machineId, tempo, dispatch } = this.props;
		const { channels, currentBankIndex } = machine;
		const drumMachineActions = bindActionCreators(DrumMachineActions.drumMachine, dispatch);
		return (
			<div className="pattern">
				<PatternTimeSignature>
					{
						numberToArrayLength(tempo.beatsPerBar)
							.map(beatIndex => {
								let segments = numberToArrayLength(tempo.segmentsPerBeat, beatIndex * tempo.segmentsPerBeat);
								return ( 
									<PatternTimeSignatureGroup>
										<PatternTimeSignature44>
											{ segments
												.map(segmentIndex =>
													<span className="signature-item">{segmentIndex + 1}</span>
												)
											}
										</PatternTimeSignature44>
										<div className="pattern-tray">
											{ channels
												.map((channel, i) => ({
													id: i,
													channel
												}))
												.filter(({ channel }, i) => channel.selected)
												.map(({ channel: { patterns }, id }, i) => 
													patterns[currentBankIndex]
													.filter((beat, index) => segments.indexOf(index) !== -1)
													.map((beat, index) => ({beat, index: segments[index]}))
													.map(({beat, index}) => 
														<PatternBeat index={index} current={playState.currentSegmentIndex === index} selected={!!beat} onToggle={() => drumMachineActions.toggleBeat(machineId, id, currentBankIndex, index, beat ? 0 : 1)} />
													)
												)
											}
										</div>
									</PatternTimeSignatureGroup>
								)
							}
						)

					}
				</PatternTimeSignature>
			</div>
		);
	}

}

export { Pattern };