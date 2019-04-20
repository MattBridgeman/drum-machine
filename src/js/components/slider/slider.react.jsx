import React from "react";
import * as _ from "../../library/natives/array";
import { normaliseValue, valueAsPercentageOfX } from "../../library/natives/numbers";

const STEP_SIZE = 33.34;
const STEP_OFFSET = -1;
const STEPS_VISIBLE = 3;

class Slider extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      touching: false,
      touches: [],
      coordinates: {
        containerWidth: 0
      },
      currentX: 0,
      previousX: 0
    }
	}
	
	render() {
    let { min, max, step, value, onValueChange, name } = this.props;
    
    let steps = _.rangeToArray(min, max, step);

    let x;
    if(this.state.touching){
      x = this.state.currentX;
      value = this.getCurrentValueFromX(x);
    } else {
      x = this.getXFromCurrentValue();
    }
    let sliderStyle = {
			transform: "translate(" + x + "%, 0)",
      transition: this.state.touching ? "" : "transform 300ms ease"
		};
    let sliderClass = this.state.touching ? "slider grabbing" : "slider";
		return (
      <div className="slider-container">
        <h3 className="item-label">{name}</h3>
				<input type="range" ref="value" min={min} max={max} step={step} className="item-value assistive" onChange={(e) => onValueChange(+(e.target.value))} />
        <div className={sliderClass} ref="slider" aria-hidden="true">
          <div className="slider-wrapper" style={sliderStyle}>
            { steps.map((item, i) => {
              let className = item === value ? "item selected" : "item";
              return (
                <div className={className}>{item}</div>
              );
            }
            )}
          </div>
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
    let { min, max, step, value, onChange } = this.props;

    let currentStep = (value - min) / step;
    let viewStep = currentStep + STEP_OFFSET;

    return viewStep * STEP_SIZE * -1
  }

  getCurrentValueFromX(x) {
    let { min, max, step } = this.props;

    let viewStep = x / (STEP_SIZE * -1);
    let currentStep = viewStep - STEP_OFFSET;
    let value = (Math.round(currentStep) + min) * step;

    return normaliseValue(value, min, max);
  }

  getCurrentX() {
    let touchDistance = this.getTouchDistance();
    let percentage = valueAsPercentageOfX(touchDistance, this.state.containerWidth);
    return this.state.previousX - percentage;
  }

  getSnapToX(x) {
    //TODO: snap to a value
    return x;
  }

  calculateContainerWidth = () => {
		let { slider: $slider } = this.refs;

    this.setState({
      containerWidth: $slider.getBoundingClientRect().width
    });
  }

  componentDidMount() {
		let { slider: $slider } = this.refs;

    this.calculateContainerWidth();

    window.addEventListener("resize", this.calculateContainerWidth);

    $slider.addEventListener("touchstart", this.onStart);
    $slider.addEventListener("touchmove", this.onMove);
    $slider.addEventListener("touchend", this.onEnd);

    $slider.addEventListener("mousedown", this.onStart);
    window.addEventListener("mousemove", this.onMove);
    window.addEventListener("mouseup", this.onEnd);
  }

  componentWillUnmount() {
		let { slider: $slider } = this.refs;
    window.removeEventListener("resize", this.calculateContainerWidth);
    $slider.removeEventListener("touchstart", this.onStart);
    $slider.removeEventListener("touchmove", this.onMove);
    $slider.removeEventListener("touchend", this.onEnd);

    $slider.removeEventListener("mousedown", this.onStart);
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mouseup", this.onEnd);
  }

  onStart = (e) => {
    e.preventDefault();
    let touch = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;
    this.setState({
      touching: true,
      touches: [touch],
      currentX: this.getXFromCurrentValue(),
      previousX: this.getXFromCurrentValue()
    });
  }

  onMove = (e) => {
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
        touches: this.state.touches.concat([touch]),
        currentX: this.getCurrentX()
      });
    });
  }

  onEnd = (e) => {
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

export { Slider };