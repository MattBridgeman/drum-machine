import * as React from "react";

class Beat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var expandedClass = this.props.expanded ? "open" : "closed";
		var expandedName = this.props.expanded ? "close" : "expand";
		var displayClass = "display beat unit red";
		var expandableButtonClass = "button expandable " + expandedClass;
		var beats = this.getBeats();
		return (
			<div className={displayClass}>
				<div className="inner">
					<p className="name">{this.props.name}</p>
					<p className="value">{this.props.value}</p>
				</div>
				<div className="inner beat-map">
					{beats}
				</div>
				<button className={expandableButtonClass}>{expandedName} display</button>
			</div>
		);
	}

	getBeats(){
		var current = this.props.current;
		return this.props.beats.map(function(beat, index){
			var buttonClass = "button",
				number = index + 1;

			buttonClass += beat ? " on" : "";
			buttonClass += current === index ? " current" : "";

			return (<button className={buttonClass}>{number}/16</button>);
		});
	}

}

Beat.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.any.isRequired,
	beats: React.PropTypes.array.isRequired,
	current: React.PropTypes.number.isRequired
};

export { Beat };