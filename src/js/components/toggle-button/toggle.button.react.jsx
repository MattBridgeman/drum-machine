import * as React from "react";

class ToggleButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name = "", onClick, selected = false, classes = "" } = this.props;
		var selectToggleClass = selected ? "selected" : "";
		var selectAriaPressed = selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={"button toggle-button " + classes + " " + selectToggleClass} aria-pressed={selectAriaPressed} onClick={onClick}>{name}</button>;
		return (toggleButton);
	}
}

ToggleButton.propTypes = {
};

export { ToggleButton };