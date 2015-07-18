import * as React from "react";

class Display extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var expandedClass = this.props.expanded ? "open" : "closed";
		var expandedName = this.props.expanded ? "close" : "expand";
		var displayClass = "display unit " + this.props.colour;
		var expandableButtonClass = "button expandable " + expandedClass;
		return (
			<div className={displayClass}>
				<div className="inner">
					<p className="name">{this.props.name}</p>
					<p className="value">{this.props.value}</p>
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