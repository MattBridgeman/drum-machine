import * as React from "react";
import * as Rx from "rx";
import { valueAsPercentage, normaliseValue, percentageToValueOfRange } from "../../library/natives/numbers";

class Rotator extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var { value, min = 0, max = 100, name, onValueChange } = this.props;
		var valuePercentage = normaliseValue(valueAsPercentage(value, min, max), 0, 100);
		var minRotation = -180 + 25;
		var maxRotation = 180 - 25;
		var rotation = percentageToValueOfRange(valuePercentage, minRotation, maxRotation);
		var knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div ref="knobContainer" className="channel-item rotator">
				<h3 ref="name" className="rotator-title">{name}</h3>
				<div className="assistive">
					<input type="range" ref="value" min={min} max={max} step="1" className="item-value" onChange={(e) => onValueChange(+(e.target.value))} />
				</div>
				<div className="knob-container">
					<div className="value-indicator"></div>
					<div className="value-indicator"></div>
					<div className="value-indicator"></div>
					<div className="value-indicator"></div>
					<div className="value-indicator"></div>
					<div className="value-indicator"></div>
					<div ref="knob" className="knob" style={knobStyle}></div>
				</div>
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
							.map((movePoint) => ({ movePoint, contactPoint})));
		knobMouseDowns
			.forEach(e => e.preventDefault && e.preventDefault());

		knobMouseDrags
			.forEach(e => e.preventDefault && e.preventDefault());
			
		knobMouseDrags
			.forEach(({contactPoint, movePoint}) => {
				let dota = contactPoint.pageX * movePoint.pageX;
				let dotb = contactPoint.pageY * movePoint.pageY;
				let a1sqr = contactPoint.pageX * contactPoint.pageX;
				let b1sqr = movePoint.pageX * movePoint.pageX;
				let a2sqr = contactPoint.pageY * contactPoint.pageY;
				let b2sqr = movePoint.pageY * movePoint.pageY;
				let a1 = Math.sqrt(a1sqr + a2sqr);
				let b1 = Math.sqrt(b1sqr + b2sqr);
				
				let cos = (dota + dotb) / (a1 * b1);
				let angle = Math.cos(cos);
				console.log(angle);
			});
	}
}

Rotator.propTypes = {
};

export { Rotator };