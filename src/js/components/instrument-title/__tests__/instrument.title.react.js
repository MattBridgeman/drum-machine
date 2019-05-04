import { expect } from "chai";
import { InstrumentTitle } from "../instrument.title.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";
import DrumMachineActions from "../../../actions/root.actions";

describe("InstrumentTitle", () => {
  const dispatchSpy = td.function();
  beforeEach(() => {
    td.replace(DrumMachineActions.instruments, "changeInstrumentName");
  })
  it("renders the Title", () => {
    const wrapper = mount(<InstrumentTitle
      instruments={[
        {
          id: 0,
          type: "drumMachine",
          selected: true
        }
      ]}
      dispatch={dispatchSpy}
    ></InstrumentTitle>);
    expect(wrapper.exists(".instrument-title")).to.be.true;
  });
  it("doesn't render title if no selected instrument", () => {
    const wrapper = mount(<InstrumentTitle
      instruments={[
        {
          id: 0,
          type: "drumMachine"
        }
      ]}
      dispatch={dispatchSpy}
    ></InstrumentTitle>);
    expect(wrapper.exists(".instrument-title")).to.be.false;
  });
  it("changes the instrument name", () => {
    const wrapper = mount(<InstrumentTitle
      instruments={[
        {
          id: 0,
          type: "drumMachine",
          selected: true
        }
      ]}
      dispatch={dispatchSpy}
    ></InstrumentTitle>);
    wrapper.find("DefaultInput").props().onValueChange("test name")
    td.verify(DrumMachineActions.instruments.changeInstrumentName(0, "test name"));
  });
});