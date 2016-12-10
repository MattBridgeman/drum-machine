import * as React from "react";
import * as _ from "../../library/natives/array";
import { easeIn, easeInOut } from "../../library/animation/easing";
import { normaliseValue, normalisedStretchValue, isBeyondNormalisedValue, valueAsPercentageOfX } from "../../library/natives/numbers";

const STEP_SIZE = 33.3;
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
    let { min, max, step, value, onValueChange } = this.props;
    
    let steps = _.rangeToArray(min, max, step);

    let x;
    if(this.state.touching){
      x = this.state.currentX;
      value = this.getCurrentValueFromX(x);
    } else {
      x = this.getXFromCurrentValue();
    }
    var sliderStyle = {
			transform: "translate(" + x + "%, 0)",
      transition: this.state.touching ? '' : 'transform 300ms ease'
		};
		return (
			<div className="slider" ref="slider">
        <div className="slider-wrapper" style={sliderStyle}>
          { steps.map((tempo, i) => {
            let className = tempo === value ? "item selected" : "item";
            return (
              <div className={className}>{tempo}</div>
            );
          }
          )}
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

    let currentStep = value - min / step;
    let viewStep = currentStep + STEP_OFFSET;

    return viewStep * STEP_SIZE * -1
  }

  getCurrentValueFromX(x) {
    let { min } = this.props;

    let viewStep = x / (STEP_SIZE * -1);
    let currentStep = viewStep - STEP_OFFSET;
    let value = currentStep + min;

    return Math.round(value);
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

  calculateContainerWidth() {
		let { slider: $slider } = this.refs;

    this.setState({
      containerWidth: $slider.getBoundingClientRect().width
    });
  }

  componentDidMount() {
		let { slider: $slider } = this.refs;

    this.calculateContainerWidth();

    window.addEventListener("resize", e => this.calculateContainerWidth);

    $slider.addEventListener("touchstart", e => this.onStart(e));
    $slider.addEventListener("touchmove", e => this.onMove(e));
    $slider.addEventListener("touchend", e => this.onEnd(e));

    $slider.addEventListener("mousedown", e => this.onStart(e));
    $slider.addEventListener("mousemove", e => this.onMove(e));
    $slider.addEventListener("mouseup", e => this.onEnd(e));
  }

  onStart(e) {
    e.preventDefault();
    let touch = e.pageX || e.touches[0].pageX;
    this.setState({
      touching: true,
      touches: [touch],
      currentX: this.getXFromCurrentValue(),
      previousX: this.getXFromCurrentValue()
    });
  }

  onMove(e) {
    e.preventDefault();
    let { onValueChange, value } = this.props;
    let touch = e.pageX || e.touches[0].pageX;
    let newValue = this.getCurrentValueFromX(this.getCurrentX());

    if(value !== newValue) {
      onValueChange(newValue);
    }

    this.setState({
      touching: true,
      touches: this.state.touches.concat([touch]),
      currentX: this.getCurrentX()
    });
  }

  onEnd(e) {
    e.preventDefault();

    let { onValueChange } = this.props;
    let value = this.getCurrentValueFromX(this.getCurrentX());

    onValueChange(value);

    this.setState({
      touching: false
    });
  }
}

Slider.propTypes = {
};

export { Slider };