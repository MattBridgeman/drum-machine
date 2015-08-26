import * as React from "react";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="channel">
				{this.props.children}
			</div>
		);
	}

};

Channel.propTypes = {
};

export { Channel };