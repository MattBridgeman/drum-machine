import * as React from "react";

class SourceSelector extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="source-selector channel-item">
				<h3 className="selected"><span>01</span> - Kick</h3><button className="button">+</button><button className="button">-</button>
			</div>
		);
	}
}

SourceSelector.propTypes = {
};

export { SourceSelector };