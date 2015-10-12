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

describe("Drum Machine - tempo value selector", () => {

	it("displays the initial beats per minute", () => {
		const store = configureStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		const tempo = store.getState().tempo.beatsPerMinute;
		var $drumMachine = $component.refs.drumMachine.refs.wrappedInstance;
		var $tempoValueSelector = $drumMachine.refs.tempoValueSelector;
		var $value = $tempoValueSelector.refs.value;
		expect($value.textContent).to.equal(tempo.toString());
	});

	it("increments beats per minute and updates UI", () => {
		const store = configureStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		const originalTempo = store.getState().tempo.beatsPerMinute;
		var $drumMachine = $component.refs.drumMachine.refs.wrappedInstance;
		var $tempoValueSelector = $drumMachine.refs.tempoValueSelector;
		var $incrementButton = $tempoValueSelector.refs.incrementButton;
		var $value = $tempoValueSelector.refs.value;

		expect($value.textContent).to.equal(originalTempo.toString());

		Simulate.click($incrementButton);

		const newTempo = store.getState().tempo.beatsPerMinute;

		expect(newTempo).to.not.equal(originalTempo);
		expect($value.textContent).to.equal(newTempo.toString());
	});

	it("decrements beats per minute and updates UI", () => {
		const store = configureStore();
		var $component = renderIntoDocument(
			<DrumMachineMock store={store} />
		);
		const originalTempo = store.getState().tempo.beatsPerMinute;
		var $drumMachine = $component.refs.drumMachine.refs.wrappedInstance;
		var $tempoValueSelector = $drumMachine.refs.tempoValueSelector;
		var $decrementButton = $tempoValueSelector.refs.decrementButton;
		var $value = $tempoValueSelector.refs.value;

		expect($value.textContent).to.equal(originalTempo.toString());

		Simulate.click($decrementButton);

		const newTempo = store.getState().tempo.beatsPerMinute;

		expect(newTempo).to.not.equal(originalTempo);
		expect($value.textContent).to.equal(newTempo.toString());
	});
});