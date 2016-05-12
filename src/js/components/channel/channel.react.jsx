import * as React from "react";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name, onClick, selected } = this.props;
		var title = name ? (
			<div className="channel-item">
				<h3 ref="name" className="item-title">{name}</h3>
			</div>
		) : null;
		var toggleClass = selected ? "selected" : "";
		var ariaPressed = selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={"button toggle-button " + toggleClass} aria-pressed={ariaPressed} onClick={onClick}>Select</button>;
		return (
			<div className="channel">
				{title}
				{toggleButton}
				{this.props.children}
			</div>
		);
	}

}

Channel.propTypes = {
};

export { Channel };