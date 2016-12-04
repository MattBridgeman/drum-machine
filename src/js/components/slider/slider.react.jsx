import * as React from "react";

class Slider extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
    let { min, max, step, onChange } = this.props;
		return (
			<div className="slider">
        <div className="slider-wrapper">
          <div className="item">1</div>
        </div>
      </div>
		);
	}

}

Slider.propTypes = {
};

export { Slider };