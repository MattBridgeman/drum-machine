import * as React from "react";
import { rangeToArray } from "../../library/natives/array";

const STEP_SIZE = 33.3;
const STEP_OFFSET = -1;

class Slider extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
    let { min, max, step, value, onChange } = this.props;
    let steps = rangeToArray(min, max, step);
    let minStep = 1;
    let maxStep = steps.length;
    let currentStep = value - min / step;
    let viewStep = currentStep + STEP_OFFSET;
    let x = viewStep * STEP_SIZE * -1;
    var sliderStyle = {
			transform: "translate(" + x + "%, 0)"
		};
		return (
			<div className="slider">
        <div className="slider-wrapper" style={sliderStyle}>
          { steps.map((tempo, i) => 
            <div className="item">{tempo}</div>
          )}
        </div>
      </div>
		);
	}

}

Slider.propTypes = {
};

export { Slider };