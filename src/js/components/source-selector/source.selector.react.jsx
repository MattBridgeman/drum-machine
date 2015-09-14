import * as React from "react";

function getSelectedNumber(index){
	var num = index + 1;
	var numStr = "" + num;
	if(numStr.length == 1) {
		return "0" + numStr
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
			<div className="source-selector channel-item">
				<h3 className="selected"><span>{selectedNumber}</span> - {selectedName}</h3><button className="button">+</button><button className="button">-</button>
			</div>
		);
	}
}

SourceSelector.propTypes = {
};

export { SourceSelector };