import * as React from "react";

class PatternBeat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { index, current, selected, onToggle, id } = this.props;
		var num = index + 1;
		var currentClass = current ? " current" : "";
		var indicatorClass = current ? " on" : "";
		var selectedClass = selected ? " selected" : "";
		var onOff = selected ? "on" : "off";
		return (
			<div className={"pattern-beat" + currentClass + selectedClass}>
				<span className={"indicator" + indicatorClass}></span>
				<button onClick={()=>onToggle(id)} className="button"><span>Beat { num } - is { onOff }</span></button>
			</div>
		);
	}

}

PatternBeat.propTypes = {
};

export { PatternBeat };