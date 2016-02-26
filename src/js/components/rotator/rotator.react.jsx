import * as React from "react";
import * as Rx from "rx";

function rotationFromValue(value, min, max){
	var range = max - min;
	return ((range / 100) * value) - max;
}

function valueAsPercentage(value, min, max){
	var range = max - min;
	var halfRange = range / 2;
	return ((range / 100) * value) - halfRange;
}

class Rotator extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var { value, min = 0, max = 100, name, onValueChange } = this.props;
		var valuePercentage = valueAsPercentage(value, min, max);
		var minRotation = -180 + 25;
		var maxRotation = 180 - 25;
		var rotation = rotationFromValue(valuePercentage, minRotation, maxRotation);
		var knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div ref="knobContainer" className="channel-item rotator">
				<h3 ref="name" className="item-title">{name}</h3>
				<input type="text" ref="value" className="item-value" onChange={(e) => onValueChange(+(e.target.value))} value={value} />
				<div ref="knob" className="knob" style={knobStyle}></div>
				<button className="increase">Increase volume</button>
				<button className="decrease">Decrease volume</button>
			</div>
		);
	}

	componentDidMount() {
		let { knob: $knob } = this.refs;
		let { onKnobRotate } = this.props;
		let $knobContainer = document;
		
		let knobMouseDowns = Rx.Observable.fromEvent($knob, "mousedown"),
			knobContainerMouseMoves = Rx.Observable.fromEvent($knobContainer, "mousemove"),
			knobContainerMouseUps = Rx.Observable.fromEvent($knobContainer, "mouseup"),
			knobMouseDrags =
				knobMouseDowns
					.concatMap((contactPoint) =>
						knobContainerMouseMoves
							.takeUntil(knobContainerMouseUps)
							.map((movePoint) => movePoint.pageY - contactPoint.pageY));

		knobMouseDrags
			.scan({
				value: 0,
				diff: 0
			},
			(acc, curr) => ({
				diff: curr ? (acc.value - curr) : 0,
				value: curr
			}))
			.forEach((obj) => onKnobRotate(obj.diff));
	}
}

Rotator.propTypes = {
};

export { Rotator };