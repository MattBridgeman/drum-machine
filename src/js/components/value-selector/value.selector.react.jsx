import React from "react";

class ValueSelector extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { value, onIncrement, onDecrement, title } = this.props;
		return (
			<div className="value-selector channel-item">
				<h4 className="title" ref="title">{title}</h4>
				<h3 ref="value" className="selected">{value}</h3>
				<button ref="incrementButton" onClick={onIncrement} className="button">+</button><button ref="decrementButton" onClick={onDecrement} className="button">-</button>
			</div>
		);
	}
}

export { ValueSelector };