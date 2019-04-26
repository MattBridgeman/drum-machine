import { expect } from "chai";
import { InstrumentSelector } from "../instrument.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("InstrumentSelector", () => {
	it("does not crash", () => {
    const wrapper = mount(<InstrumentSelector
      instruments={[{
        type: "drumMachine",
        id: 0,
        machineId: 0
      },{
        type: "synth",
        id: 1,
        machineId: 0
      }]}
      onChange
      onNewInstrument />);
    const $selectButtons = wrapper.find(".select-instrument-button");
    const $addInstrument = wrapper.find(".add-instrument");
    expect($selectButtons.length).to.equal(2);
    expect($addInstrument.length).to.equal(1);
  });
});