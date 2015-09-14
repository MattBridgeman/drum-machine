import * as React from "react";

class Pattern extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="pattern">
				{this.props.children}
			</div>
		);
	}

}

Pattern.propTypes = {
};

export { Pattern };