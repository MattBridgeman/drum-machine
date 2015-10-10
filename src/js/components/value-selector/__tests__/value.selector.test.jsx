import React from "react/addons";
import { ValueSelector } from "../value.selector.react.jsx";
import { expect } from "chai";

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

describe("Value Selector", () => {

  it("renders a value selector", () => {
    const component = renderIntoDocument(
      <ValueSelector />
    );
    expect(typeof component).to.equal("object");
  });

  it("triggers 'on increment' callback when button is pressed", () => {
		var incremented = false;
    const component = renderIntoDocument(
      <ValueSelector onIncrement={() => incremented = true} />
    );
    var incrementButton = component.refs.incrementButton;
    expect(incremented).to.equal(false);
    Simulate.click(incrementButton);
    expect(incremented).to.equal(true);
  });

  it("triggers 'on decrement' callback when button is pressed", () => {
		var decremented = false;
    const component = renderIntoDocument(
      <ValueSelector onDecrement={() => decremented = true} />
    );
    var decrementButton = component.refs.decrementButton;
    expect(decremented).to.equal(false);
    Simulate.click(decrementButton);
    expect(decremented).to.equal(true);
  });

});