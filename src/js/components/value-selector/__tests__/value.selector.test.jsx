import React from "react";
import ValueSelector from "../value.selector.react";

const {renderIntoDocument} = React.addons.TestUtils;

describe("Value Selector", () => {

  it("renders a value selector", () => {
    const component = renderIntoDocument(
      <ValueSelector />
    );
  });
  
  it("triggers 'on increment' callback when button is pressed", () => {
  	var incremented = false;
    const component = renderIntoDocument(
      <ValueSelector onIncrement={() => incremented = true} />
    );
  
  it("triggers 'on decrement' callback when button is pressed", () => {
  	var decremented = false;
    const component = renderIntoDocument(
      <ValueSelector onDecrement={() => decremented = true} />
    );
  });

});