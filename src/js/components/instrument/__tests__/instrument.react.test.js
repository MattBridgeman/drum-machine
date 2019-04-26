import { expect } from "chai";
import { InstrumentSelector, Instrument } from "../instrument.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

import storeState from "./store.fixture.json";

describe("InstrumentSelector", () => {
	it("renders the instruments and an add instrument", () => {
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

describe("Instruments", () => {
	it("renders the selected instrument", () => {
    const wrapper = mount(<Instrument
      {...storeState} />);
    console.log(wrapper.html());
  });
});