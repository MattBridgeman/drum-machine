import * as React from "react";

class ValueSelector extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var { value, onIncrement, onDecrement } = this.props;
		return (
			<div className="source-selector channel-item">
				<h3 className="selected">{value}</h3><button ref="incrementButton" onClick={onIncrement} className="button">+</button><button ref="decrementButton" onClick={onDecrement} className="button">-</button>
			</div>
		);
	}
}

ValueSelector.propTypes = {
};

export { ValueSelector };