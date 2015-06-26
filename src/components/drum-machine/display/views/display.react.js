import * as React from "react";

class HelloWorld extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			{this.state.text}
			</div>
		);
	}

}

export { HelloWorld };