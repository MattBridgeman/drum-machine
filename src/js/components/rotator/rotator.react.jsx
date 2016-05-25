import * as React from "react";
import * as Rx from "rx";
import { valueAsPercentage, normaliseValue, percentageToValueOfRange } from "../../library/natives/numbers";
import { lengthOfLine } from "../../library/geometry/line";
import { angleInRightTriangleInDegrees } from "../../library/geometry/triangle";

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
			
		// knobMouseDrags
		// 	.forEach(({contactPoint, movePoint}) => {
		// 		let dota = contactPoint.pageX * movePoint.pageX;
		// 		let dotb = contactPoint.pageY * movePoint.pageY;
		// 		let axsqr = contactPoint.pageX * contactPoint.pageX;
		// 		let bxsqr = movePoint.pageX * movePoint.pageX;
		// 		let aysqr = contactPoint.pageY * contactPoint.pageY;
		// 		let bysqr = movePoint.pageY * movePoint.pageY;
		// 		let a1 = Math.sqrt(axsqr + aysqr);
		// 		let b1 = Math.sqrt(bxsqr + bysqr);
				
		// 		let cos = (dota + dotb) / (a1 * b1);
		// 		let angle = Math.acos(cos) * 1000;
		// 		console.log(angle);
		// 	});
		knobMouseDrags
			.forEach(({contactPoint, movePoint}) => {
				let originx = contactPoint.pageX;
				let originy = contactPoint.pageY;
				let ax = originx - movePoint.pageX;
				let ay = originy - movePoint.pageY;
				let bx = originx - movePoint.pageX;
				let by = 0;
				let aLength = lengthOfLine({x: ax, y: ay}, { x: 0, y: 0 });
				let bLength = lengthOfLine({x: bx, y: by}, { x: 0, y: 0 });
				let angle = angleInRightTriangleInDegrees(bLength, aLength);
				console.log(angle);
			});
	}
}

Rotator.propTypes = {
};

export { Rotator };