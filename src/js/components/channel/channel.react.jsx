import * as React from "react";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name } = this.props;
		var title = name ? (
			<div className="channel-item">
				<h3 ref="name" className="item-title">{name}</h3>
			</div>
		) : null;
		var toggleClass = this.props.selected ? "selected" : "";
		var ariaPressed = this.props.selected ? "true" : "false";
		var toggleButton = <button ref="toggleButton" className={"button toggle-button " + toggleClass} aria-pressed={ariaPressed}>Select</button>;
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