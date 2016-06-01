import * as React from "react";

class ToggleButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name, onClick, selected, classes } = this.props;
		var selectToggleClass = selected ? "selected" : "";
		var selectAriaPressed = selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={classes + " " + selectToggleClass} aria-pressed={selectAriaPressed} onClick={onClick}>{name}</button>;
		return (toggleButton);
	}
}

ToggleButton.propTypes = {
};

export { ToggleButton };