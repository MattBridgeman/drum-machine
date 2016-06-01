import TestUtils from "react-addons-test-utils";
import React from "react";
import { ToggleButton } from "../toggle.button.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("ToggleButton", () => {

	it("renders a ToggleButton", () => {
		let $component = renderIntoDocument(
			<ToggleButton />
		);
		expect($component).to.be.a("object");
	});

	it("updates displays the correct name", () => {
		let expectedName = "rotator name";
		let $component = renderIntoDocument(
			<ToggleButton name={expectedName} />
		);
		let { toggleButton } = $component.refs;

		expect(toggleButton.textContent).to.equal(expectedName);
	});

	it("updates aria-pressed === false by default", () => {
		let $component = renderIntoDocument(
			<ToggleButton />
		);
		let { toggleButton } = $component.refs;
		
		expect(toggleButton.getAttribute("aria-pressed")).to.equal('false');
	});

	it("updates aria-pressed === true if prop selected === true", () => {
		let selected = true;
		let $component = renderIntoDocument(
			<ToggleButton selected={selected} />
		);
		let { toggleButton } = $component.refs;
		
		expect(toggleButton.getAttribute("aria-pressed")).to.equal('true');
	});

	it("updates aria-pressed === false by default", () => {
		let $component = renderIntoDocument(
			<ToggleButton />
		);
		let { toggleButton } = $component.refs;
		
		expect(toggleButton.getAttribute("aria-pressed")).to.equal('false');
	});

	it("classes from props to be appended to classes", () => {
		let classes = "foo bar baz";
		let $component = renderIntoDocument(
			<ToggleButton classes={classes} />
		);
		let { toggleButton } = $component.refs;
		
		expect(toggleButton.className).to.include(classes);
	});

	it("selected class to be appended to classes from props", () => {
		let classes = "foo bar baz";
		let selected = true;
		let $component = renderIntoDocument(
			<ToggleButton classes={classes} selected={selected} />
		);
		let { toggleButton } = $component.refs;
		
		expect(toggleButton.className).to.include(classes);
		expect(toggleButton.className).to.include("selected");
	});

	it("onClick to be fired on click", () => {
		let foo = false;
		let onClick = () => foo = true;
		let $component = renderIntoDocument(
			<ToggleButton onClick={onClick} />
		);
		let { toggleButton } = $component.refs;
		
		Simulate.click(toggleButton);

		expect(foo).to.equal(true);
	});
});