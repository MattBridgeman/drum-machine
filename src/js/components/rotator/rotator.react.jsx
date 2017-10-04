import React from "react";
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
    this.state = {
      touching: false,
			currentTouch: [0, 0],
      previousRotation: [0, 0]
    }
	}
	
	render() {
		let { value, min = DEFAULT_MIN_VALUE, max = DEFAULT_MAX_VALUE, name, onValueChange, classes } = this.props;
		let rotation;
    if(this.state.touching){
			let { currentTouch, newValue } = this.state;
      rotation = this.getRotationFromValue(newValue);
    } else {
      rotation = this.getRotationFromValue(value);
    }
		let knobStyle = {
			transform: "rotate(" + rotation + "deg)"
		};
		return (
			<div ref="knobContainer" className={(classes || "channel-item") + " rotator"}>
				<h3 ref="name" className="item-label">{name}</h3>
				<input type="range" ref="value" min={min} max={max} step="1" className="item-value assistive" onChange={(e) => onValueChange(+(e.target.value))} />
				<div className="knob-container" aria-hidden="true">
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

	getRotationFromValue(value) {
		let { min = DEFAULT_MIN_VALUE, max = DEFAULT_MAX_VALUE, name, onValueChange, classes } = this.props;
		let valuePercentage = normaliseValue(valueAsPercentageOfRange(value, min, max), 0, 100);
		let rotation = percentageToValueOfRange(valuePercentage, MIN_ROTATION, MAX_ROTATION);
		return rotation;
	}

	componentDidMount() {
		let { knob: $knob } = this.refs;
		let $knobContainer = document;

		$knob.addEventListener("touchstart", e => this.onStart(e));
		$knob.addEventListener("touchmove", e => this.onMove(e));
		$knob.addEventListener("touchend", e => this.onEnd(e));

		$knob.addEventListener("mousedown", e => this.onStart(e));
		$knobContainer.addEventListener("mousemove", e => this.onMove(e));
		$knobContainer.addEventListener("mouseup", e => this.onEnd(e));
	}

	getLengthAndAngleFromCentre(movePoint){
		let { knob: $knob } = this.refs;
		let { currentTouch } = this.state;
		let knobCoordinates = $knob.getBoundingClientRect();
		let scrollY = window.pageYOffset;
		let originx = knobCoordinates.left + (knobCoordinates.width / 2);
		let originy = knobCoordinates.top + (knobCoordinates.height / 2) + scrollY;
		let ax = movePoint[0] - originx;
		let ay = originy - movePoint[1];
		let bx = movePoint[0] - originx;
		let by = 0;
		let aLength = lengthOfLine({x: ax, y: ay}, { x: 0, y: 0 });
		let bLength = lengthOfLine({x: bx, y: by}, { x: 0, y: 0 });
		let angle = angleInRightTriangleInDegrees(bLength, aLength);
		let realAngle = angleFromVerticalGivenXandY(angle, {x: ax, y: ay});
		return { length: aLength, angle: realAngle };
	}

	getValueFromLengthAndAngle({ length, angle }){
		let angleLess180 = angle - 180;
		let { min = DEFAULT_MIN_VALUE, max = DEFAULT_MAX_VALUE, value } = this.props;
		let percentage = valueAsPercentageOfRange(normaliseValue(angleLess180, MIN_ROTATION, MAX_ROTATION), MIN_ROTATION, MAX_ROTATION);
		let newValue = percentageToValueOfRange(percentage, min, max);
		return newValue;
	}

	getValueFromTouch(touch){
		let lengthAndAngle = this.getLengthAndAngleFromCentre(touch);
		return this.getValueFromLengthAndAngle(lengthAndAngle);
	}

	onStart(e) {
		e.preventDefault();
		let touchX = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
		let touchY = e.pageY !== undefined ? e.pageY : e.touches[0].pageY;
		let touch = [touchX, touchY];
		let newValue = this.getValueFromTouch(touch);
		this.setState({
			touching: true,
			currentTouch: [touchX, touchY],
			newValue
		});
	}

	onMove(e) {
		if(!e.target || !this.state.touching) {
			return;
		}
		e.preventDefault();
		let { onValueChange, value } = this.props;
		let touchX = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
		let touchY = e.pageY !== undefined ? e.pageY : e.touches[0].pageY;
		let touch = [touchX, touchY];
		let newValue = this.getValueFromTouch(touch);

		if(this.rafId) window.cancelAnimationFrame(this.rafId);

		this.rafId = window.requestAnimationFrame(() => {
			if(!this.state.touching) return;
			if(value !== newValue) {
				onValueChange(newValue);
			}

			this.setState({
				touching: true,
				currentTouch: [touchX, touchY],
				newValue
			});
		})
	}

	onEnd(e) {
		if(!e.target || !this.state.touching) {
			return;
		}
		e.preventDefault();

		this.setState({
			touching: false
		});
	}
}

export { Rotator };