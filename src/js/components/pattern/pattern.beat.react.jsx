import React from "react";
import classnames from "classnames";

class PatternBeat extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { index, current, selected, onToggle, showIndicator = true } = this.props;
		var num = index + 1;
		var onOff = selected ? "on" : "off";
		return (
			<div className={classnames("pattern-beat", { current, selected })}>
				{ showIndicator && <span className={classnames("indicator", { on: current })}></span> }
				<button onClick={()=>onToggle()} className="button"><span>Beat { num } - is { onOff }</span></button>
			</div>
		);
	}

}

export { PatternBeat };