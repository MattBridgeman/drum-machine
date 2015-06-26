import * as React from "react";

class HelloWorld extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: "hello world!!"
		};
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