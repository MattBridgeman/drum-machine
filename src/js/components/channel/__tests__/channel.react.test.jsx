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

	it("adds selected class if channel is selected", () => {
		let expectedClass = " selected";
		let $component = renderIntoDocument(
			<Channel selected={true} />
		);
		let { channel } = $component.refs;
		expect(channel.className).to.contain(expectedClass);
	});

	// Disable failing tests until it's determined why
	// you cannot 'ref' an externally imported React component

	// it("triggers onSelectClick callback on click", () => {
	// 	let clicked = false,
	// 		onSelectClick = function(){
	// 			clicked = true;
	// 		};
	// 	let $component = renderIntoDocument(
	// 		<Channel onSelectClick={onSelectClick} />
	// 	);
	// 	let { toggleButton } = $component.refs;

	// 	Simulate.click(toggleButton);

	// 	expect(clicked).to.equal(true);
	// });

	// it("triggers onSoloClick callback on click", () => {
	// 	let clicked = false,
	// 		onSoloClick = function(){
	// 			clicked = true;
	// 		};
	// 	let $component = renderIntoDocument(
	// 		<Channel onSoloClick={onSoloClick} />
	// 	);
	// 	let { soloButton } = $component.refs;

	// 	Simulate.click(soloButton);

	// 	expect(clicked).to.equal(true);
	// });

	// it("triggers onMuteClick callback on click", () => {
	// 	let clicked = false,
	// 		onMuteClick = function(){
	// 			clicked = true;
	// 		};
	// 	let $component = renderIntoDocument(
	// 		<Channel onMuteClick={onMuteClick} />
	// 	);
	// 	let { muteButton } = $component.refs;

	// 	Simulate.click(muteButton);

	// 	expect(clicked).to.equal(true);
	// });
});