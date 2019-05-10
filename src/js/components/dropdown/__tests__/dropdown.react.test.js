import { expect } from "chai";
import { DropDownMenu } from "../dropdown.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("DropDownMenu", () => {
	it("renders the DropDownMenu with header and content", () => {
    const callbackSpy = td.function();
    const wrapper = mount(<DropDownMenu items={[
      {
        condition: () => true,
        name: "item name",
        callback: callbackSpy
      }
    ]} />);
    expect(wrapper.exists(".dropdown-menu")).to.be.true;
  });
	it("opens the DropDownMenu", () => {
    const callbackSpy = td.function();
    const wrapper = mount(<DropDownMenu items={[
      {
        condition: () => true,
        name: "item name",
        callback: callbackSpy
      }
    ]} />);
    const Trigger = wrapper.find(".dropdown-menu-trigger");
    Trigger.simulate("click");
    const Selector = wrapper.find(".dropdown-menu");
    expect(Selector.hasClass("open")).to.be.true;
  });
	it("closes the DropDownMenu via overlay", () => {
    const callbackSpy = td.function();
    const wrapper = mount(<DropDownMenu items={[
      {
        condition: () => true,
        name: "item name",
        callback: callbackSpy
      }
    ]} />);
    const Trigger = wrapper.find(".dropdown-menu-trigger");
    Trigger.simulate("click");
    const Overlay = wrapper.find(".dropdown-menu-panel-overlay");
    Overlay.simulate("click");
    const Selector = wrapper.find(".dropdown-menu");
    expect(Selector.hasClass("open")).to.be.false;
  });
	it("calls callback of the DropDownMenu item", () => {
    const callbackSpy = td.function();
    const wrapper = mount(<DropDownMenu items={[
      {
        condition: () => true,
        name: "item name",
        callback: callbackSpy
      }
    ]} />);
    const Trigger = wrapper.find(".dropdown-menu-trigger");
    Trigger.simulate("click");
    const DropdownLink = wrapper.find(".dropdown-link");
    DropdownLink.simulate("click");
    const Selector = wrapper.find(".dropdown-menu");
    td.verify(callbackSpy());
    expect(Selector.hasClass("open")).to.be.false;
  });
  
});