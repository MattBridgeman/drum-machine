import TestUtils from "react-dom/test-utils";
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

	it("displays the initial name", () => {
		let expectedName = "rotator name";
		let expectedValue = 125;
		let $component = renderIntoDocument(
			<Rotator name={expectedName} value={expectedValue} />
		);
		let { name } = $component.refs;
		expect(name.textContent).to.equal(expectedName);
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
	
	//TODO: Fix tests that reference _style
	// it("rotates the rotator to the minimum when min value is applied", () => {
	// 	let value = 0;
	// 	let expectedRotation = "rotate(-155deg)";
	// 	let $component = renderIntoDocument(
	// 		<Rotator value={value} />
	// 	);
	// 	let { knob } = $component.refs;

	// 	console.log(knob);

	// 	expect(knob._style.transform).to.equal(expectedRotation);
	// });
	
	// it("rotates the rotator to the maximum when max value is applied", () => {
	// 	let value = 100;
	// 	let expectedRotation = "rotate(155deg)";
	// 	let $component = renderIntoDocument(
	// 		<Rotator value={value} />
	// 	);
	// 	let { knob } = $component.refs;

	// 	expect(knob._style.transform).to.equal(expectedRotation);
	// });

});