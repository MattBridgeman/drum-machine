import React from "react";

class Display extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var expandedClass = this.props.expanded ? "open" : "closed";
		var expandedName = this.props.expanded ? "close" : "expand";
		var displayClass = "display unit " + (this.props.colour || "green");
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

}

export { Display };