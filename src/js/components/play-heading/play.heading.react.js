import * as React from "react";

class PlayHeading extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isPlaying: props.isPlaying,
			value: props.value
		};
	}
	
	onClick(){
		this.props.onPlayPause();
	}

	render() {
		var buttonText = this.state.isPlaying ? "Pause" : "Play";
		return (
			<div className="heading unit">
				<div className="inner">
					<div className="name">
						<button className="button dark" onClick={this.onClick.bind(this)}>{buttonText}</button>
					</div>
					<p className="value">{this.state.value}</p>
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