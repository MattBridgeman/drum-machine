import * as React from "react";

class PlayToggle extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { isPlaying, onPlayPause } = this.props;
		let text = isPlaying ? "Pause" : "Play";
		return (
			<div className="play-toggle channel-item">
				<button className="button dark" onClick={ () => onPlayPause() }>{ text }</button>
			</div>
		);
	}
}

PlayToggle.propTypes = {
};

export { PlayToggle };