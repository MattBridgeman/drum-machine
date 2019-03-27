import React from "react";
import classnames from "classnames";
import * as _ from "../../library/natives/array";
import { normaliseValue, valueAsPercentageOfX } from "../../library/natives/numbers";

class Fader extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      touching: false,
      touches: [],
      containerWidth: 0,
      currentX: 0,
      previousX: 0
    }
	}
	
	render() {
    let { min, max, step, value, onValueChange, name } = this.props;

    let x;
    if(this.state.touching){
      x = this.state.currentX;
      value = this.getCurrentValueFromX(x);
    } else {
      x = this.getXFromCurrentValue();
    }
    let faderStyle = {
			transform: `translate(${x}px, 0)`
		};
		return (
      <div className="fader-container" ref="faderContainer">
        <h3 className="item-label">{name}</h3>
				<input type="range" ref="value" min={min} max={max} step={step} className="item-value assistive" onChange={(e) => onValueChange(+(e.target.value))} />
        <div className={classnames("fader", { grabbing: this.state.touching })} ref="fader" aria-hidden="true" style={faderStyle}>
        </div>
      </div>
		);
	}

  getTouchDistance() {
    var first = _.first(this.state.touches);
    var last = _.last(this.state.touches);
    var distance = first - last;
    return distance;
  }

  getXFromCurrentValue() {
    let { min, max, step, value } = this.props;
    let stepSize = this.state.containerWidth;
    let currentStep = (value - min) / step;

    return currentStep * stepSize / 100;
  }

  getCurrentValueFromX(x) {
    let { min, max, step } = this.props;
    let stepSize = this.state.containerWidth;
    let viewStep = x / stepSize * 100;
    let value = (Math.round(viewStep) + min) * step;
    console.log('stepSize', stepSize, 'viewStep', viewStep, 'value', value);
    return normaliseValue(value, min, max);
  }

  getCurrentX() {
    let touchDistance = this.getTouchDistance();
    let percentage = valueAsPercentageOfX(touchDistance, this.state.containerWidth);
    return this.state.previousX - touchDistance;
  }

  calculateContainerWidth() {
		let { faderContainer: $faderContainer } = this.refs;

    this.setState({
      containerWidth: $faderContainer.getBoundingClientRect().width
    });
  }

  componentDidMount() {
		let { fader: $fader } = this.refs;

    this.calculateContainerWidth();

    window.addEventListener("resize", e => this.calculateContainerWidth);

    $fader.addEventListener("touchstart", e => this.onStart(e));
    $fader.addEventListener("touchmove", e => this.onMove(e));
    $fader.addEventListener("touchend", e => this.onEnd(e));

    $fader.addEventListener("mousedown", e => this.onStart(e));
    window.addEventListener("mousemove", e => this.onMove(e));
    window.addEventListener("mouseup", e => this.onEnd(e));
  }

  onStart(e) {
    e.preventDefault();
    let touch = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
    this.setState({
      touching: true,
      touches: [touch],
      currentX: this.getXFromCurrentValue(),
      previousX: this.getXFromCurrentValue()
    });
  }

  onMove(e) {
    if(!e.target || !this.state.touching) {
      return;
    }
    e.preventDefault();
    let { onValueChange, value } = this.props;
    let touch = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
    let newValue = this.getCurrentValueFromX(this.getCurrentX());

		if(this.rafId) window.cancelAnimationFrame(this.rafId);

		this.rafId = window.requestAnimationFrame(() => {
      if(!this.state.touching) return;
      
      if(value !== newValue) {
        onValueChange(newValue);
      }
      
      this.setState({
        touching: true,
        touches: [...this.state.touches, touch],
        currentX: this.getCurrentX()
      });
    });
  }

  onEnd(e) {
    if(!e.target || !this.state.touching) {
      return;
    }
    e.preventDefault();

    let { onValueChange } = this.props;
    let value = this.getCurrentValueFromX(this.getCurrentX());

    onValueChange(value);

    this.setState({
      touching: false
    });
  }
}

export { Fader };