import * as React from "react";

class Display extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			value: props.value,
			colour: props.colour
		};
	}

	render() {
		var expandedClass = this.state.expanded ? "open" : "closed";
		var expandedName = this.state.expanded ? "close" : "expand";
		var displayClass = "display unit " + this.state.colour;
		var expandableButtonClass = "button expandable " + expandedClass;
		return (
			<div className={displayClass}>
				<div className="inner">
					<p className="name">{this.state.name}</p>
					<p className="value">{this.state.value}</p>
				</div>
				<button className={expandableButtonClass}>{expandedName} display</button>
			</div>
		);
	}

};

Display.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.any.isRequired,
	colour: React.PropTypes.string
};

Display.defaultProps = { colour: "green" };

export { Display };