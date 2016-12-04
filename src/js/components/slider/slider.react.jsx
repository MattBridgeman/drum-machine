import * as React from "react";
import { rangeToArray } from "../../library/natives/array";

class Slider extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
    let { min, max, step, onChange } = this.props;
    debugger;
    let steps = rangeToArray(min, max, step);
		return (
			<div className="slider">
        <div className="slider-wrapper">
          { steps.map((tempo, i) => 
            <div className="item">{ tempo }</div>
          )}
        </div>
      </div>
		);
	}

}

Slider.propTypes = {
};

export { Slider };