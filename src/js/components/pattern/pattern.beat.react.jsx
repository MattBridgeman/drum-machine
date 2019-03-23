import React from "react";

class PatternBeat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { index, current, selected, onToggle, showIndicator = true } = this.props;
		var num = index + 1;
		var currentClass = current ? " current" : "";
		var indicatorClass = current ? " on" : "";
		var selectedClass = selected ? " selected" : "";
		var onOff = selected ? "on" : "off";
		return (
			<div className={"pattern-beat" + currentClass + selectedClass}>
				{ showIndicator && <span className={"indicator" + indicatorClass}></span> }
				<button onClick={()=>onToggle()} className="button"><span>Beat { num } - is { onOff }</span></button>
			</div>
		);
	}

}

export { PatternBeat };