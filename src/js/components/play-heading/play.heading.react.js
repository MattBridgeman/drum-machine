import * as React from "react";
import { DrumMachineActions } from "../drum-machine/actions/drum.machine.actions";

class PlayHeading extends React.Component {

	constructor(props) {
		super(props);
	}
	
	onClick(){
		DrumMachineActions.togglePlayPause();
		this.props.onPlayPause();
	}

	render() {
		var buttonText = this.props.isPlaying ? "Pause" : "Play";
		return (
			<div className="heading unit">
				<div className="inner">
					<div className="name">
						<button className="button dark" onClick={this.onClick.bind(this)}>{buttonText}</button>
					</div>
					<p className="value">{this.props.value}</p>
				</div>
			</div>
		);
	}

};

PlayHeading.propTypes = {
	isPlaying: React.PropTypes.bool.isRequired,
	value: React.PropTypes.string.isRequired,
	onPlayPause: React.PropTypes.func
};

export { PlayHeading };