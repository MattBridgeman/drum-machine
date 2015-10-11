import TestUtils from "react-addons-test-utils";
import React, { Component } from "react";
import DrumMachine from "../drum.machine.react.jsx";
import { expect } from "chai";
import { Provider } from "react-redux";
import configureStore from "../store/drum.machine.store";

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
		const store = configureStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		expect($component).to.be.a("object");
	});

});

describe("Drum Machine - Tempo", () => {

	it("displays the initial beats per minute", () => {
		const store = configureStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		const tempo = store.getState().tempo.tempo.beatsPerMinute;
		var $drumMachine = $component.refs.drumMachine.refs.wrappedInstance;
		var $tempoValueSelector = $drumMachine.refs.tempoValueSelector;
		var $value = $tempoValueSelector.refs.value;
		expect($value.textContent).to.equal(tempo.toString());
	});

});