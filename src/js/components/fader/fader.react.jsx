import React from "react";
import classnames from "classnames";
import * as _ from "../../library/natives/array";
import { normaliseValue, valueAsPercentageOfX, percentageToValueOfRange } from "../../library/natives/numbers";

class Fader extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      touching: false,
      touches: [],
      containerWidth: 0,
      containerHeight: 0,
      faderWidth: 0,
      faderHeight: 0,
      currentX: 0,
      currentY: 0,
      previousY: 0
    }
	}
	
	render() {
    let { min, max, step, onValueChange, name, id, orientation } = this.props;

    let x, y;
    if(this.state.touching){
      x = this.state.currentX;
      y = this.state.currentY;
    } else {
      x = this.getXFromCurrentValue();
      y = this.getYFromCurrentValue();
    }
    let faderStyle = {
			transform: `translate(${x}px, ${y}px)`
		};
		return (
      <div className={classnames("fader-container", { "orientation-vertical": orientation === "vertical" })} ref="faderContainer">
        <h3 className="item-label">{name}</h3>
				<input id={id} type="range" ref="value" min={min} max={max} step={step} className="item-value assistive" onChange={(e) => onValueChange(+(e.target.value))} />
        <div className={classnames("fader", { grabbing: this.state.touching })} ref="fader" aria-hidden="true" style={faderStyle}>
        </div>
      </div>
		);
	}

  getTouchDistanceX() {
    var first = _.first(this.state.touchesX);
    var last = _.last(this.state.touchesX);
    var distance = first - last;
    return distance;
  }

  getTouchDistanceY() {
    var first = _.first(this.state.touchesY);
    var last = _.last(this.state.touchesY);
    var distance = first - last;
    return distance;
  }

  getXFromCurrentValue() {
    let { min, max, step, value, orientation } = this.props;
    if(orientation === "vertical") return 0;
    let stepSize = this.getContainerWidth();
    let currentStep = (value - min) / step;
    return currentStep * stepSize / (max-min);
  }

  getYFromCurrentValue() {
    let { min, max, step, value, orientation } = this.props;
    if(orientation !== "vertical") return 0;
    let stepSize = this.getContainerHeight();
    let currentStep = (value - min) / step;
    return currentStep * stepSize / (max-min);
  }

  getCurrentValueFromX(x) {
    let { min, max, step } = this.props;
    let stepSize = this.getContainerWidth();
    let viewStep = x / stepSize * 100;
    let value = (Math.round(viewStep) + min) * step;
    return normaliseValue(percentageToValueOfRange(value, min, max), min, max);
  }

  getCurrentValueFromY(y) {
    let { min, max, step } = this.props;
    let stepSize = this.getContainerHeight();
    let viewStep = y / stepSize * 100;
    let value = (Math.round(viewStep) + min) * step;
    return normaliseValue(percentageToValueOfRange(value, min, max), min, max);
  }

  getContainerWidth() {
    return this.state.containerWidth - this.state.faderWidth;
  }

  getContainerHeight() {
    return this.state.containerHeight - this.state.faderHeight;
  }

  getCurrentX() {
    let { orientation } = this.props;
    if(orientation === "vertical") return 0;
    let touchDistance = this.getTouchDistanceX();
    let diff = this.state.previousX - touchDistance;
    return normaliseValue(diff, 0, this.getContainerWidth());
  }

  getCurrentY() {
    let { orientation } = this.props;
    if(orientation !== "vertical") return 0;
    let touchDistance = this.getTouchDistanceY();
    let diff = this.state.previousY - touchDistance;
    return normaliseValue(diff, 0, this.getContainerHeight());
  }

  calculateContainerDimensions = () => {
		let {
      faderContainer: $faderContainer,
      fader: $fader
    } = this.refs;

    let faderContainerDimensions = $faderContainer.getBoundingClientRect();
    let faderDimensions = $fader.getBoundingClientRect();

    this.setState({
      containerWidth: faderContainerDimensions.width,
      containerHeight: faderContainerDimensions.height,
      faderWidth: faderDimensions.width,
      faderHeight: faderDimensions.width
    });
  }

  componentDidMount() {
		let { fader: $fader } = this.refs;

    this.calculateContainerDimensions();

    window.addEventListener("resize", this.calculateContainerDimensions);

    $fader.addEventListener("touchstart", this.onStart);
    $fader.addEventListener("touchmove", this.onMove);
    $fader.addEventListener("touchend", this.onEnd);

    $fader.addEventListener("mousedown", this.onStart);
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.onEnd);
  }

  componentWillUnmount() {
		let { fader: $fader } = this.refs;
    window.removeEventListener("resize", this.calculateContainerDimensions);
    $fader.removeEventListener("touchstart", this.onStart);
    $fader.removeEventListener("touchmove", this.onMove);
    $fader.removeEventListener("touchend", this.onEnd);

    $fader.removeEventListener("mousedown", this.onStart);
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onEnd);
  }

  onStart = (e) => {
    e.preventDefault();
    let touchX = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
    let touchY = e.pageY !== undefined ? e.pageY : e.touches[0].pageY;
    this.setState({
      touching: true,
      touchesX: [touchX],
      touchesY: [touchY],
      currentX: this.getXFromCurrentValue(),
      previousX: this.getXFromCurrentValue(),
      currentY: this.getYFromCurrentValue(),
      previousY: this.getYFromCurrentValue()
    });
  }

  onMove = (e) => {
    if(!e.target || !this.state.touching) {
      return;
    }
    e.preventDefault();
    let { onValueChange, value, orientation } = this.props;
    let touchX = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
    let touchY = e.pageY !== undefined ? e.pageY : e.touches[0].pageY;
    let newValue;
    if(orientation === "vertical") {
      newValue = this.getCurrentValueFromY(this.getCurrentY());
    } else {
      newValue = this.getCurrentValueFromX(this.getCurrentX());
    }

		if(this.rafId) window.cancelAnimationFrame(this.rafId);

		this.rafId = window.requestAnimationFrame(() => {
      if(!this.state.touching) return;
      
      if(value !== newValue) {
        onValueChange(newValue);
      }
      
      this.setState({
        touching: true,
        touchesX: [...this.state.touchesX, touchX],
        touchesY: [...this.state.touchesY, touchY],
        currentX: this.getCurrentX(),
        currentY: this.getCurrentY()
      });
    });
  }

  onEnd = (e) => {
    if(!e.target || !this.state.touching) {
      return;
    }
    e.preventDefault();

    let { onValueChange, orientation } = this.props;

    let value;
    if(orientation === "vertical") {
      value = this.getCurrentValueFromY(this.getCurrentY());
    } else {
      value = this.getCurrentValueFromX(this.getCurrentX());
    }
    onValueChange(value);

    this.setState({
      touching: false
    });
  }
}

export { Fader };