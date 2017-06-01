import TestUtils from "react-dom/test-utils";
import React, { Component } from "react";
import DrumMachine from "../drum.machine.react.jsx";
import { expect } from "chai";
import { Provider } from "react-redux";
import configureTestStore from "../../../store/drum.machine.test.store";

const { renderIntoDocument, Simulate } = TestUtils;

class DrumMachineMock extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
				<DrumMachine ref="drumMachine" />
			</Provider>
		);
	}
}

describe("Drum Machine", () => {

	it("renders a drum machine", () => {
		const store = configureTestStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		expect($component).to.be.a("object");
	});

});