import { expect } from "chai";
import { InstrumentTitle } from "../instrument.title.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("InstrumentTitle", () => {
  const dispatchSpy = td.function();
  it("renders the tray", () => {
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
});