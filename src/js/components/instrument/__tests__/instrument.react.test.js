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
      }]} />);
    const $selectButtons = wrapper.find(".select-instrument-button");
    const $addInstrument = wrapper.find(".add-instrument");
    expect($selectButtons.length).to.equal(2);
    expect($addInstrument.length).to.equal(1);
  });
	it("calls onChange when button clicked", () => {
    const onChangeSpy = td.function();
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
      onChange={onChangeSpy}
    />);
    const $selectButton = wrapper.find(".select-instrument-button").at(0);
    $selectButton.simulate("click");
    td.verify(onChangeSpy(0, "drumMachine", 0, 0));
  });
	it("calls onDelete when button clicked", () => {
    const onDeleteSpy = td.function();
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
      onDelete={onDeleteSpy}
       />);
    const $selectButton = wrapper.find(".delete-instrument-button").at(0);
    $selectButton.simulate("click");
    td.verify(onDeleteSpy(0, "drumMachine", 0, 0));
  });
});

describe("Instruments", () => {
	it("renders the selected instrument", () => {
    const wrapper = mount(<Instrument
      {...storeState} />);;
  });
	it("renders a drum machine", () => {
    const wrapper = mount(<Instrument
      {...({
        ...storeState,
        instruments: [{
          "type": "drumMachine",
          "id": 0,
          "machineId": 0,
          "selected": true
        }]
      })} />);
    expect(wrapper.exists("DrumMachine")).to.equal(true);
  });
	it("ignores unknown instruments", () => {
    const wrapper = mount(<Instrument
      instruments={[
        {
          id: 0,
          type: "random",
          selected: true
        }
      ]} />);
      expect(wrapper.html()).to.equal(null)
  });
});