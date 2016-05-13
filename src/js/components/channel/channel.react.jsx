import * as React from "react";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name, onSelectClick, onSoloClick, selected, solo, muted } = this.props;
		var title = name ? (
			<div className="channel-item">
				<h3 ref="name" className="item-title">{name}</h3>
			</div>
		) : null;

		var selectToggleClass = selected ? "selected" : "";
		var selectAriaPressed = selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={"button toggle-button " + selectToggleClass} aria-pressed={selectAriaPressed} onClick={onSelectClick}>Select</button>;
		

		var soloToggleClass = solo ? "selected" : "";
		var soloAriaPressed = solo ? "true" : "false";
		var soloButton = <button ref="soloButton" className={"button toggle-button " + soloToggleClass} aria-pressed={soloAriaPressed} onClick={onSoloClick}>Solo</button>;
		return (
			<div className="channel">
				{title}
				{toggleButton}
				{soloButton}
				{this.props.children}
			</div>
		);
	}

}

Channel.propTypes = {
};

export { Channel };