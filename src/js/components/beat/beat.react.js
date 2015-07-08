import * as React from "react";

class Beat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			value: props.value,
			beats: props.beats,
			current: props.current
		};
	}

	render() {
		var expandedClass = this.state.expanded ? "open" : "closed";
		var expandedName = this.state.expanded ? "close" : "expand";
		var displayClass = "display beat unit red";
		var expandableButtonClass = "button expandable " + expandedClass;
		var beats = this.getBeats();
		return (
			<div className={displayClass}>
				<div className="inner">
					<p className="name">{this.state.name}</p>
					<p className="value">{this.state.value}</p>
				</div>
				<div className="inner beat-map">
					{beats}
				</div>
				<button className={expandableButtonClass}>{expandedName} display</button>
			</div>
		);
	}

	getBeats(){
		var current = this.state.current;
		return this.state.beats.map(function(beat, index){
			var buttonClass = "button",
				number = index + 1;

			buttonClass += beat ? " on" : "";
			buttonClass += current == index ? " current" : "";

			return <button className={buttonClass}>{number}/16</button>
		});
	}

};

Beat.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.any.isRequired,
	beats: React.PropTypes.array.isRequired,
	current: React.PropTypes.number.isRequired
};

export { Beat };