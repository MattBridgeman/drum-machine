import TestUtils from "react-addons-test-utils";
import React from "react";
import { Rotator } from "../rotator.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Rotator", () => {

	it("renders a Rotator", () => {
		let $component = renderIntoDocument(
			<Rotator />
		);
		expect($component).to.be.a("object");
	});

	it("displays the initial name and value", () => {
		let expectedName = "rotator name";
		let expectedValue = 125;
		let $component = renderIntoDocument(
			<Rotator name={expectedName} value={expectedValue} />
		);
		let { name, value } = $component.refs;
		expect(name.textContent).to.equal(expectedName);
		expect(+(value.value)).to.equal(expectedValue);
	});
	
	it("updates the value when changed via the value input field", () => {
		let expectedName = "rotator name";
		let expectedValue = 125;
		let expectedNewValue = 126;
		let actualNewValue;
		let $component = renderIntoDocument(
			<Rotator name={expectedName} value={expectedValue} onValueChange={(value) => actualNewValue = value} />
		);
		let { value } = $component.refs;
		
		Simulate.change(value, { target: { value: "" + expectedNewValue } });
    	Simulate.blur(value, { target: { value: "" + expectedNewValue } });
		
		expect(+(actualNewValue)).to.equal(expectedNewValue);
	});
	

});