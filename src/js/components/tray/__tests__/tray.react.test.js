import { expect } from "chai";
import { Tray } from "../tray.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("Tray", () => {
  it("renders the tray", () => {
    const wrapper = mount(<Tray
      title="test title"
    >
      {() => <div className="test-class"></div>}
    </Tray>);
    expect(wrapper.exists(".tray-container")).to.be.true;
  });
  it("opens the tray when you click the trigger", () => {
    const wrapper = mount(<Tray
      title="test title"
    >
      {() => <div className="test-class"></div>}
    </Tray>);
    wrapper.find(".tray-button").simulate("click");
    expect(wrapper.exists(".tray-container .test-class")).to.be.true;
  });
  it("closes the tray when you click the tray overlay", () => {
    const wrapper = mount(<Tray
      title="test title"
    >
      {() => <div className="test-class"></div>}
    </Tray>);
    wrapper.find(".tray-button").simulate("click");
    wrapper.find(".tray-overlay").simulate("click");
    expect(wrapper.exists(".tray-container .test-class")).to.be.false;
  });
  it("opens the tray via a trigger", () => {
    const wrapper = mount(<Tray
      trigger={({onOpen}) => <button className="trigger-button" onClick={onOpen}></button>}
      title="test title"
    >
      {() => <div className="test-class"></div>}
    </Tray>);
    wrapper.find(".trigger-button").simulate("click");
    expect(wrapper.exists(".tray-container .test-class")).to.be.true;
  });
  it("closes the tray when the child onClose is triggered", () => {
    const wrapper = mount(<Tray
      title="test title"
    >
      {({onClose}) => <div className="test-class" onClick={onClose}></div>}
    </Tray>);
    wrapper.find(".tray-button").simulate("click");
    wrapper.find(".test-class").simulate("click");
    expect(wrapper.exists(".tray-container .test-class")).to.be.false;
  });
});