import * as React from "react";

function rotationFromValue(value, min, max){
	var range = max - min;
	return ((range / 100) * value) - max;
}

class Rotator extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var value = 50;
		var minRotation = -180 + 25;
		var maxRotation = 180 - 25;
		var rotation = rotationFromValue(value, minRotation, maxRotation);
		var knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div className="channel-item rotator">
				<h3 className="item-title">{this.props.name}</h3>
				<p className="item-value">{value}</p>
				<div className="knob" style={knobStyle}></div>
				<button className="increase">Increase volume</button>
				<button className="decrease">Decrease volume</button>
			</div>
		);
	}
};

Rotator.propTypes = {
};

export { Rotator };