import * as React from "react";
import * as Rx from "rx";

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
		var $knobContainer = this.refs.knob.getDOMNode();
		
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
								return {
									pageX: movePoint.pageX - contactPoint.pageX,
									pageY: movePoint.pageY - contactPoint.pageY
								};
							});;
					});

		knobMouseDrags.forEach(function(dragPoint) {
			console.log(dragPoint.pageX);
			// dragPoint.pageY + "px";
		});
	}
};

Rotator.propTypes = {
};

export { Rotator };