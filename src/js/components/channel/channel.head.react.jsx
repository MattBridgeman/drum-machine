import * as React from "react";
import { ToggleButton } from "../toggle-button/toggle.button.react.jsx";

class ChannelHead extends React.Component {

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

		return (
			<div className="channel-head">
				{title}
				<ToggleButton ref="toggleButton" classes="channel-item select-button" selected={selected} name="Select" onClick={onSelectClick} />
				<div className="channel-tray">
					<ToggleButton ref="soloButton" classes="channel-item green" selected={solo} name="Solo" onClick={onSoloClick} />
					<ToggleButton ref="muteButton" classes="channel-item red" selected={muted} name="Mute" onClick={onMuteClick} />
				</div>
			</div>
		);
	}

}

ChannelHead.propTypes = {
};

export { ChannelHead };