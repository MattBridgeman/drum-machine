import { expect } from "chai";
import { PlayBar } from "../playbar.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";
import DrumMachineActions from "../../../actions/root.actions";

import storeState from "../../../library/test-helpers/fixtures/store.fixture.json";

describe("Channels", () => {
  const dispatchSpy = td.function();
  beforeEach(() => {
    td.replace(DrumMachineActions.playState, "togglePlayPause");
    td.replace(DrumMachineActions.tempo, "changeBPMToAmount");
    td.replace(DrumMachineActions.instruments, "changeInstrument");
    td.replace(DrumMachineActions.instruments, "deleteInstrument");
    td.replace(DrumMachineActions.instruments, "onNewInstrument");
  });
  afterEach(() => {
    td.reset();
  })
  it("renders the playbar", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    expect(wrapper.exists(".play-bar")).to.be.true;
  });
  it("calls togglePlayPause action", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("PlayBarPlayPause");
    Selector.props().onClick();
    td.verify(DrumMachineActions.playState.togglePlayPause());
  });
  it("calls togglePlayPause action", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find("PlayBarTempo");
    Selector.props().onChange(125);
    td.verify(DrumMachineActions.tempo.changeBPMToAmount(125));
  });

  it("opens the instrument selector tray", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find(".play-bar__instruments__button");
    Selector.simulate("click");
    expect(wrapper.exists("InstrumentSelector")).to.be.true;
  });

  it("calls onChange correctly", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find(".play-bar__instruments__button");
    Selector.simulate("click");
    const InstrumentSelector = wrapper.find("InstrumentSelector");
    InstrumentSelector.props().onChange(0, "drumMachine", "0", 0);
    td.verify(DrumMachineActions.instruments.changeInstrument(0, "drumMachine", "0", 0));
  });

  it("calls onDelete correctly", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find(".play-bar__instruments__button");
    Selector.simulate("click");
    const InstrumentSelector = wrapper.find("InstrumentSelector");
    InstrumentSelector.props().onDelete(0, "drumMachine", "0", 0);
    td.verify(DrumMachineActions.instruments.deleteInstrument(0, "drumMachine", "0", 0));
  });

  it("calls onNewInstrument correctly", () => {
    const wrapper = mount(<PlayBar
      tempo={{
        beatsPerMinute: 120
      }}
      playState={{
        isPlaying: false
      }}
      instruments={[{
        id: 0,
        type: "drumMachine",
        selected: true
      }]}
      dispatch={dispatchSpy}
    />);
    const Selector = wrapper.find(".play-bar__instruments__button");
    Selector.simulate("click");
    const InstrumentSelector = wrapper.find("InstrumentSelector");
    InstrumentSelector.props().onNewInstrument("drumMachine");
    td.verify(DrumMachineActions.instruments.onNewInstrument("drumMachine"));
  });
});