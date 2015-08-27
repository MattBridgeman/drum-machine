import * as React from "react";
import * as Rx from "rx";

function rotationFromValue(value, min, max){
	var range = max - min;
	return ((range / 100) * value) - max;
}

function normaliseValue(value){
	if(value < 0) return 0;
	if(value > 100) return 100;
	return value;
}

class Rotator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: 50
		};
	}
	
	render() {
		var value = this.state.value;
		var minRotation = -180 + 25;
		var maxRotation = 180 - 25;
		var rotation = rotationFromValue(value, minRotation, maxRotation);
		var knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div ref="knobContainer" className="channel-item rotator">
				<h3 className="item-title">{this.props.name}</h3>
				<p className="item-value">{value}</p>
				<div ref="knob" className="knob" style={knobStyle}></div>
				<button className="increase">Increase volume</button>
				<button className="decrease">Decrease volume</button>
			</div>
		);
	}
	
	componentDidMount() {
		var $knob = this.refs.knob.getDOMNode();
		var $knobContainer = document;
		
		var knobMouseDowns = Rx.Observable.fromEvent($knob, "mousedown"),
			knobContainerMouseMoves = Rx.Observable.fromEvent($knobContainer, "mousemove"),
			knobContainerMouseUps = Rx.Observable.fromEvent($knobContainer, "mouseup"),
			knobMouseDrags =
				// For every mouse down event on the knob...
				knobMouseDowns.
					concatMap(function(contactPoint) {
						// ...retrieve all the mouse move events on the knob container...
						return knobContainerMouseMoves.
							// ...until a mouse up event occurs.
							takeUntil(knobContainerMouseUps).
							map(function(movePoint) {
								return movePoint.pageY - contactPoint.pageY;
							});
					});

		knobMouseDrags
			.scan(0, (acc, curr) => acc - curr)
			.forEach((valueChange) => this.updateValue(valueChange));
	}
	
	updateValue(valueChange){
		var value = normaliseValue(this.state.value + valueChange);
		this.setState({
			value
		});
	}
};

Rotator.propTypes = {
};

export { Rotator };