import React from "react";
import TestUtils from "react-dom/test-utils";
import { ValueSelector } from "../value.selector.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Value Selector", () => {

  it("renders a value selector", () => {
    const $component = renderIntoDocument(
      <ValueSelector />
    );
    expect($component).to.be.a("object");
  });

  it("triggers 'on increment' callback when button is pressed", () => {
		var incremented = false;
    const $component = renderIntoDocument(
      <ValueSelector onIncrement={() => incremented = true} />
    );
    var $incrementButton = $component.refs.incrementButton;
    expect(incremented).to.equal(false);
    Simulate.click($incrementButton);
    expect(incremented).to.equal(true);
  });

  it("triggers 'on decrement' callback when button is pressed", () => {
		var decremented = false;
    const $component = renderIntoDocument(
      <ValueSelector onDecrement={() => decremented = true} />
    );
    var $decrementButton = $component.refs.decrementButton;
    expect(decremented).to.equal(false);
    Simulate.click($decrementButton);
    expect(decremented).to.equal(true);
  });

  it("displays the correct value recieved via props", () => {
		var value = 120;
    const $component = renderIntoDocument(
      <ValueSelector value={value} />
    );
    var $value = $component.refs.value;
    expect($value.textContent).to.equal(value.toString());
  });

  it("displays the correct title recieved via props", () => {
		var title = "Tempo";
    const $component = renderIntoDocument(
      <ValueSelector title={title} />
    );
    var $title = $component.refs.title;
    expect($title.textContent).to.equal(title);
  });

});