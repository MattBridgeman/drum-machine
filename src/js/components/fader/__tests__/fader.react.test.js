import { expect } from "chai";
import { Fader } from "../fader.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("Fader", () => {
	it("renders the instruments and an add instrument", () => {
    const onValueChangeSpy = td.function();
    const wrapper = mount(<Fader
      min={1}
      max={10}
      step={1}
      value={1}
      onValueChange={onValueChangeSpy}
      name="Fader Name"
      id="fader"
      orientation="horizontal"
      type="test-type"
      width={200}
      height={10}
    />);
    expect(wrapper.exists(".fader-container")).to.be.true;
  });
  it("drags the fader", () => {
    const onValueChangeSpy = td.function();
    const wrapper = mount(<Fader
      min={1}
      max={10}
      step={1}
      value={1}
      onValueChange={onValueChangeSpy}
      name="Fader Name"
      id="fader"
      orientation="horizontal"
      type="test-type"
      width={200}
      height={10}
    />);
    const FaderInstance = wrapper.instance();
    FaderInstance.onStart({
      preventDefault: td.function(),
      target: "foo",
      touches: [{
        pageX: 0,
        pageY: 0
      }]
    });
    FaderInstance.onMove({
      preventDefault: td.function(),
      target: "foo",
      touches: [{
        pageX: 100,
        pageY: 0
      }]
    });
    FaderInstance.onEnd({
      preventDefault: td.function(),
      target: "foo"
    });
    td.verify(onValueChangeSpy(1.09));
  });
});