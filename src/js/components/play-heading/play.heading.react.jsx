import React from "react";

class PlayHeading extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var buttonText = this.props.isPlaying ? "Pause" : "Play";
		var onPlayPause = this.props.onPlayPause();
		return (
			<div className="heading unit">
				<div className="inner">
					<div className="name">
						<button className="button dark" onClick={onPlayPause}>{buttonText}</button>
					</div>
					<p className="value">{this.props.value}</p>
				</div>
			</div>
		);
	}

}

export { PlayHeading };