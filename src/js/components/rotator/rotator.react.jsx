import * as React from "react";
import * as Rx from "rx";
import { valueAsPercentageOfRange, normaliseValue, percentageToValueOfRange } from "../../library/natives/numbers";
import { lengthOfLine } from "../../library/geometry/line";
import { angleInRightTriangleInDegrees, angleFromVerticalGivenXandY } from "../../library/geometry/triangle";

const MIN_ROTATION = -180 + 25;
const MAX_ROTATION = 180 - 25;
const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;

class Rotator extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var { value, min = DEFAULT_MIN_VALUE, max = DEFAULT_MAX_VALUE, name, onValueChange, classes } = this.props;
		var valuePercentage = normaliseValue(valueAsPercentageOfRange(value, min, max), 0, 100);
		var rotation = percentageToValueOfRange(valuePercentage, MIN_ROTATION, MAX_ROTATION);
		var knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div ref="knobContainer" className={(classes || "channel-item") + " rotator"}>
				<h3 ref="name" className="item-label">{name}</h3>
				<input type="range" ref="value" min={min} max={max} step="1" className="item-value assistive" onChange={(e) => onValueChange(+(e.target.value))} />
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
		let $knobContainer = document;
		
		let knobMouseDowns = Rx.Observable.fromEvent($knob, "mousedown"),
			knobContainerMouseMoves = Rx.Observable.fromEvent($knobContainer, "mousemove"),
			knobContainerMouseUps = Rx.Observable.fromEvent($knobContainer, "mouseup"),
			knobMouseDrags =
				knobMouseDowns
					.concatMap((contactPoint) =>
						knobContainerMouseMoves
							.takeUntil(knobContainerMouseUps)
							.map(movePoint => {
								let knobCoordinates = $knob.getBoundingClientRect();
								let originx = knobCoordinates.left + (knobCoordinates.width / 2);
								let originy = knobCoordinates.top + (knobCoordinates.height / 2);
								let ax = movePoint.pageX - originx;
								let ay = originy - movePoint.pageY;
								let bx = movePoint.pageX - originx;
								let by = 0;
								let aLength = lengthOfLine({x: ax, y: ay}, { x: 0, y: 0 });
								let bLength = lengthOfLine({x: bx, y: by}, { x: 0, y: 0 });
								let angle = angleInRightTriangleInDegrees(bLength, aLength);
								let realAngle = angleFromVerticalGivenXandY(angle, {x: ax, y: ay});
								return { length: aLength, angle: realAngle };
							})
							.filter(({ length }) => length > 1));
		knobMouseDowns
			.forEach(e => e.preventDefault && e.preventDefault());

		knobMouseDrags
			.forEach(e => e.preventDefault && e.preventDefault());
			
		knobMouseDrags
			.forEach(({ length, angle }) => {
				let angleLess180 = angle - 180;
				let { onKnobRotate, min = DEFAULT_MIN_VALUE, max = DEFAULT_MAX_VALUE, value } = this.props;
				let percentage = valueAsPercentageOfRange(normaliseValue(angleLess180, MIN_ROTATION, MAX_ROTATION), MIN_ROTATION, MAX_ROTATION);
				let newValue = percentageToValueOfRange(percentage, min, max);
				onKnobRotate(newValue || value);
			});
	}
}

Rotator.propTypes = {
};

export { Rotator };