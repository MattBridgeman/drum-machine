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
    td.replace(DrumMachineActions.drumMachine, "changeVolumeToAmount");
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
	it("calls changeVolumeToAmount correctly", () => {
    const wrapper = mount(<Channels
      machine={storeState.drumMachine[0]}
      machineId="0"
      {...storeState}
      dispatch={dispatchSpy}
    />);
    const SoundSelector = wrapper.find("Rotator").at(0);
    SoundSelector.props().onValueChange(50);
    td.verify(DrumMachineActions.drumMachine.changeVolumeToAmount("0", 0, 50));
  });
});