import { expect } from "chai";
import { Collapsible, CollapsibleHeader, CollapsibleContent } from "../collapsible.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("Collapsible", () => {
	it("renders the Collapsible with header and content", () => {
    const wrapper = mount(<Collapsible>
      <CollapsibleHeader>header</CollapsibleHeader>
      <CollapsibleContent>content</CollapsibleContent>
    </Collapsible>);
    expect(wrapper.exists(".collapsible")).to.be.true;
    expect(wrapper.exists(".collapsible-header")).to.be.true;
    expect(wrapper.find(".collapsible-header").text()).to.equal("header");
    expect(wrapper.exists(".collapsible-content")).to.be.true;
    expect(wrapper.find(".collapsible-content").text()).to.equal("content");
  });
	it("calls CollapsibleHeader on click", () => {
    const onClickSpy = td.function();
    const e = null;
    const wrapper = mount(<Collapsible>
      <CollapsibleHeader onClick={onClickSpy}>header</CollapsibleHeader>
      <CollapsibleContent>content</CollapsibleContent>
    </Collapsible>);
    const Selector = wrapper.find("CollapsibleHeader");
    Selector.props().onClick(e);
    td.verify(onClickSpy(e));
  });
	it("opens the Collapsible", () => {
    const e = null;
    const wrapper = mount(<Collapsible>
      <CollapsibleHeader>header</CollapsibleHeader>
      <CollapsibleContent>content</CollapsibleContent>
    </Collapsible>);
    const Selector = wrapper.find(".collapsible-header a");
    Selector.simulate("click");
    const CollapsibleSelector = wrapper.find(".collapsible");
    expect(CollapsibleSelector.hasClass("open")).to.be.true;
  });
	it("closes the Collapsible", () => {
    const e = null;
    const wrapper = mount(<Collapsible>
      <CollapsibleHeader>header</CollapsibleHeader>
      <CollapsibleContent>content</CollapsibleContent>
    </Collapsible>);
    const Selector = wrapper.find(".collapsible-header a");
    Selector.simulate("click");
    Selector.simulate("click");
    const CollapsibleSelector = wrapper.find(".collapsible");
    expect(CollapsibleSelector.hasClass("closed")).to.be.true;
  });
});