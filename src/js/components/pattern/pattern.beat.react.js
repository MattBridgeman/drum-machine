import * as React from "react";

class PatternBeat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { index, current, selected } = this.props;
		var num = index + 1;
		var currentClass = current ? " current" : "";
		var selectedClass = selected ? " selected" : "";
		return (
			<div className={"pattern-beat" + currentClass + selectedClass}>
				<button className="button"><span>Beat 01 - is on</span></button>
			</div>
		);
	}

}

PatternBeat.propTypes = {
};

export { PatternBeat };