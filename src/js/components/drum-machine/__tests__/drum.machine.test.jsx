import React from "react/addons";
import DrumMachine from "../drum.machine.react.jsx";
import { expect } from "chai";
import { Provider } from 'react-redux';
import configureStore from '../store/drum.machine.store';

const store = configureStore();
const { renderIntoDocument, Simulate } = React.addons.TestUtils;

describe("Drum Machine", () => {

	it("renders a drum machine", () => {
		const $component = renderIntoDocument(
			<Provider store={store}>
				{() => <DrumMachine />}
			</Provider>
		);
		expect($component).to.be.a("object");
	});

});

describe("Drum Machine - Tempo", () => {

	it("displays the initial beats per minute", () => {
		const $component = renderIntoDocument(
			<Provider store={store}>
				{() => <DrumMachine />}
			</Provider>
		);
		console.log($component);
		const tempo = store.getState().tempo.beatsPerMinute;
		var $tempoValueSelector = $component.refs.tempoValueSelector;
		console.log($tempoValueSelector);
		var $value = $tempoValueSelector.refs.value;
		expect($value.getDOMNode().textContent).to.equal(tempo);
	});

});