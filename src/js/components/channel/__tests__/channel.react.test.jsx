import TestUtils from "react-addons-test-utils";
import React from "react";
import { Channel } from "../channel.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Channel", () => {

	it("renders a Channel", () => {
		let $component = renderIntoDocument(
			<Channel />
		);
		expect($component).to.be.a("object");
	});

	it("displays the initial name", () => {
		let expectedName = "Channel name";
		let $component = renderIntoDocument(
			<Channel name={expectedName} />
		);
		let { name } = $component.refs;
		expect(name.textContent).to.equal(expectedName);
	});

	it("displays an unselected button, given selected=false prop", () => {
		let selected = false;
		let $component = renderIntoDocument(
			<Channel selected={selected} />
		);
		let { toggleButton } = $component.refs;
		expect(toggleButton.classList.contains("selected")).to.equal(false);
		expect(toggleButton.getAttribute('aria-pressed')).to.equal('false');
	});

	it("displays an selected button, given selected=true prop", () => {
		let selected = true;
		let $component = renderIntoDocument(
			<Channel selected={selected} />
		);
		let { toggleButton } = $component.refs;
		expect(toggleButton.classList.contains("selected")).to.equal(true);
		expect(toggleButton.getAttribute('aria-pressed')).to.equal('true');
	});

	it("triggers onClick callback on click", () => {
		let clicked = false,
			onClick = function(){
				clicked = true;
			};
		let $component = renderIntoDocument(
			<Channel onClick={onClick} />
		);
		let { toggleButton } = $component.refs;

		Simulate.click(toggleButton);

		expect(clicked).to.equal(true);
	});
});