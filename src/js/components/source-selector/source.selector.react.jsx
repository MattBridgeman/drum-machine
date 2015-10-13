import * as React from "react";
import { ValueSelector } from "../value-selector/value.selector.react.jsx";

function getSelectedNumber(index){
	var num = index + 1;
	var numStr = "" + num;
	if(numStr.length === 1) {
		return "0" + numStr;
	} else {
		return numStr;
	}
}

class SourceSelector extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var { selectedIndex, options } = this.props;
		var selectedName = options[selectedIndex];
		var selectedNumber = getSelectedNumber(selectedIndex);
		return (
			<ValueSelector value={ selectedNumber + " - " + selectedName } title="Source" />
		);
	}
}

SourceSelector.propTypes = {
};

export { SourceSelector };