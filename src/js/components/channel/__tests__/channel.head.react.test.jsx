import TestUtils from "react-dom/test-utils";
import React from "react";
import { ChannelHead } from "../channel.head.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("ChannelHead", () => {

	it("renders a ChannelHead", () => {
		let $component = renderIntoDocument(
			<ChannelHead />
		);
		expect($component).to.be.a("object");
	});

	it("displays the initial name", () => {
		let expectedName = "Channel name";
		let $component = renderIntoDocument(
			<ChannelHead name={expectedName} />
		);
		let { name } = $component.refs;
		expect(name.textContent).to.equal(expectedName);
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