import * as React from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name, onSelectClick, onSoloClick, onMuteClick, selected, solo, muted } = this.props;
		var title = name ? (
			<div className="channel-item">
				<h3 ref="name" className="item-title">{name}</h3>
			</div>
		) : null;

		var toggleButton = <ToggleButton ref="toggleButton" classes="channel-item" selected={selected} name="Select" onClick={onSelectClick} />;
		var soloButton = <ToggleButton ref="soloButton" classes="channel-item green" selected={solo} name="Solo" onClick={onSoloClick} />;
		var muteButton = <ToggleButton ref="muteButton" classes="channel-item red" selected={muted} name="Mute" onClick={onMuteClick} />;
		var channelClass = "channel " + (selected ? "selected" : "");

		return (
			<div className={channelClass} ref="channel">
				{title}
				{toggleButton}
				<div className="channel-tray">
					{soloButton}
					{muteButton}
				</div>
				{this.props.children}
			</div>
		);
	}

}

Channel.propTypes = {
};

export { Channel };