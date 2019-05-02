import { expect } from "chai";
import { Channels } from "../channels.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";
import DrumMachineActions from "../../../actions/root.actions";

import storeState from "../../../library/test-helpers/fixtures/store.fixture.json";

describe("Channels", () => {
  const dispatchSpy = td.function();
  beforeEach(() => {
    td.replace(DrumMachineActions.drumMachine, "changeSelectedSound");
    td.replace(DrumMachineActions.drumMachine, "changeSelectedChannel");
    td.replace(DrumMachineActions.drumMachine, "toggleMuteChannel");
    td.replace(DrumMachineActions.drumMachine, "toggleSoloChannel");
    td.replace(DrumMachineActions.drumMachine, "changeVolumeToAmount");
    td.replace(DrumMachineActions.drumMachine, "changePitchToAmount");
    td.replace(DrumMachineActions.drumMachine, "changeDecayToAmount");
    td.replace(DrumMachineActions.drumMachine, "changePanToAmount");
    td.replace(DrumMachineActions.drumMachine, "toggleReverb");
  });
  afterEach(() => {
    td.reset();
  });
	it("renders the channels", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    expect(wrapper.exists(".channels-container")).to.be.true;
  });
	it("calls changeSelectedSound correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const SoundSelector = wrapper.find("SoundSelector").at(0);
    SoundSelector.props().onSoundChange("1234");
    td.verify(DrumMachineActions.drumMachine.changeSelectedSound("0", 0, "1234"));
  });
	it("calls changeSelectedChannel correctly on ToggleButton click", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const ToggleButton = wrapper.find("ToggleButton").at(0);
    ToggleButton.props().onClick();
    td.verify(DrumMachineActions.drumMachine.changeSelectedChannel("0", 0));
  });
	it("calls toggleSoloChannel correctly on ToggleButton click", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const ToggleButton = wrapper.find("ToggleButton").at(1);
    ToggleButton.props().onClick();
    td.verify(DrumMachineActions.drumMachine.toggleSoloChannel("0", 0));
  });
	it("calls toggleMuteChannel correctly on ToggleButton click", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const ToggleButton = wrapper.find("ToggleButton").at(2);
    ToggleButton.props().onClick();
    td.verify(DrumMachineActions.drumMachine.toggleMuteChannel("0", 0));
  });
	it("calls changeVolumeToAmount correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("Rotator").at(0);
    Selector.props().onValueChange(50);
    td.verify(DrumMachineActions.drumMachine.changeVolumeToAmount("0", 0, 50));
  });
	it("calls changePitchToAmount correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("Rotator").at(1);
    Selector.props().onValueChange(50);
    td.verify(DrumMachineActions.drumMachine.changePitchToAmount("0", 0, 50));
  });
	it("calls changeDecayToAmount correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("Rotator").at(2);
    Selector.props().onValueChange(50);
    td.verify(DrumMachineActions.drumMachine.changeDecayToAmount("0", 0, 50));
  });
	it("calls changePanToAmount correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("Rotator").at(3);
    Selector.props().onValueChange(50);
    td.verify(DrumMachineActions.drumMachine.changePanToAmount("0", 0, 50));
  });
	it("calls toggleReverb correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("ToggleButton").at(3);
    Selector.props().onClick(100);
    td.verify(DrumMachineActions.drumMachine.toggleReverb("0", 0, 100));
  });
});