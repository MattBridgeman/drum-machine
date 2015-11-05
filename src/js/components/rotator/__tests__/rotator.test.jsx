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
		let _name = "rotator name";
		let _value = 125;
		let $component = renderIntoDocument(
			<Rotator name={_name} value={_value} />
		);
		let { name, value } = $component.refs;
		expect(name.textContent).to.equal(_name);
		expect(+(value.textContent)).to.equal(_value);
	});
	
	it("updates the value when changed via the value input field", () => {
		let _name = "rotator name";
		let _value = 125;
		let expectedNewValue = 126;
		let actualNewValue;
		let $component = renderIntoDocument(
			<Rotator name={_name} value={_value} onValueChange={(value) => actualNewValue = value} />
		);
		let { value, input } = $component.refs;
		
		Simulate.change(input, { target: { value: "" + expectedNewValue } });
    	Simulate.blur(input);
		
		expect(actualNewValue).to.equal(expectedNewValue);
	});
	

});