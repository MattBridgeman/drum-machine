import * as React from "react";

class Channel extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var { name } = this.props;
		var title = name ? (
			<div className="channel-item">
				<h3 className="item-title">{name}</h3>
			</div>
		) : null;
		return (
			<div className="channel">
				{title}
				{this.props.children}
			</div>
		);
	}

}

Channel.propTypes = {
};

export { Channel };