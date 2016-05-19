import * as React from "react";

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

		var selectToggleClass = selected ? "selected" : "";
		var selectAriaPressed = selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={"channel-item button toggle-button " + selectToggleClass} aria-pressed={selectAriaPressed} onClick={onSelectClick}>Select</button>;
		
		var soloToggleClass = solo ? "selected" : "";
		var soloAriaPressed = solo ? "true" : "false";
		var soloButton = <button ref="soloButton" className={"channel-item button toggle-button green " + soloToggleClass} aria-pressed={soloAriaPressed} onClick={onSoloClick}>Solo</button>;
		
		var muteToggleClass = muted ? "selected" : "";
		var muteAriaPressed = muted ? "true" : "false";
		var muteButton = <button ref="muteButton" className={"channel-item button toggle-button red " + muteToggleClass} aria-pressed={muteAriaPressed} onClick={onMuteClick}>Mute</button>;
		
		return (
			<div className="channel">
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