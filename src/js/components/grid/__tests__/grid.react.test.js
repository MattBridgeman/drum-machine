import { expect } from "chai";
import { GridAxis, GridAxisItem, Grid, GridRow, GridItem, GridScroll, GridContainer } from "../grid.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";

describe("GridAxis", () => {
	it("renders 2 child items for GridAxis x", () => {
    const wrapper = mount(<GridAxis
      type="x"
      max={{
        columns: 2
      }}
      offset={{
        column: 0
      }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridAxis>);
    expect(wrapper.find(".grid-axis div").length).to.equal(2);
  });
	it("renders 2 child items for GridAxis y", () => {
    const wrapper = mount(<GridAxis
      type="y"
      max={{
        rows: 2
      }}
      offset={{
        row:0
      }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridAxis>);
    expect(wrapper.find(".grid-axis div").length).to.equal(2);
  });
});

describe("GridRow", () => {
	it("renders 2 child items for GridRow x", () => {
    const wrapper = mount(<GridRow
      type="x"
      max={{
        columns: 2
      }}
      offset={{
        column: 0
      }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridRow>);
    expect(wrapper.find(".grid-row-x div").length).to.equal(2);
  });
});

describe("GridAxisItem", () => {
	it("renders 2 child items for GridAxisItem x", () => {
    const wrapper = mount(<GridAxisItem type="x">
      <div></div>
    </GridAxisItem>);
    expect(wrapper.exists(".grid-axis-item-x div")).to.equal(true);
  });
});

describe("Grid", () => {
	it("renders Grid", () => {
    const wrapper = mount(<Grid
      max={{
        columns: 2,
        rows: 2
      }}
      offset={{
        column: 0,
        row: 0
      }}>
      <div></div>
      <div></div>
      <div></div>
    </Grid>);
    expect(wrapper.find(".grid div").length).to.equal(2);
  });
});

describe("GridItem", () => {
	it("renders GridItem", () => {
    const wrapper = mount(<GridItem>
      <div></div>
    </GridItem>);
    expect(wrapper.find(".grid-item div").length).to.equal(1);
  });
});

describe("GridScroll", () => {
	it("renders GridScroll", () => {
    const wrapper = mount(<GridScroll>
      <div></div>
    </GridScroll>);
    expect(wrapper.find(".grid-scroll div").length).to.equal(1);
  });
});

describe("GridContainer", () => {
  beforeEach(() => {
    td.replace(window, "addEventListener");
    td.replace(window, "removeEventListener");
    td.replace(Element.prototype, "getBoundingClientRect");

    td.when(Element.prototype.getBoundingClientRect())
      .thenReturn({
        width: 110,
        height: 110
      });
  });
  afterEach(() => {
    td.reset();
  });
	it("renders a grid container and calls resize event listener", () => {
    const wrapper = mount(<GridContainer
      columns={2}
      rows={2}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    expect(wrapper.exists("#grid-container-scroll-x")).to.equal(true);
    expect(wrapper.exists("#grid-container-scroll-y")).to.equal(true);
    td.verify(window.addEventListener("resize", td.matchers.anything()));
  });
	it("calls remove resize event listener", () => {
    const wrapper = mount(<GridContainer
      columns={2}
      rows={2}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    wrapper.unmount();
    td.verify(window.removeEventListener("resize", td.matchers.anything()));
  });
	it("calls onValueChange of x axis", () => {
    const wrapper = mount(<GridContainer
      columns={2}
      rows={2}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    const $fader = wrapper.find("#grid-container-scroll-x").at(0);
    $fader.props().onValueChange(1);
    const state = wrapper.state();
    expect(state.max).to.deep.equal({ columns: 1, rows: 1 });
    expect(state.offset).to.deep.equal({ column: 1, row: 0 });
  });
	it("calls onValueChange of y axis", () => {
    const wrapper = mount(<GridContainer
      columns={1}
      rows={1}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    const $fader = wrapper.find("#grid-container-scroll-y").at(0);
    $fader.props().onValueChange(1);
    const state = wrapper.state();
    expect(state.max).to.deep.equal({ columns: 1, rows: 1 });
    expect(state.offset).to.deep.equal({ column: 0, row: 1 });
  });
 
	it("never exceeds the column count set by the outside word", () => {

    td.when(Element.prototype.getBoundingClientRect())
      .thenReturn({
        width: 200,
        height: 200
      });
    const wrapper = mount(<GridContainer
      columns={8}
      rows={8}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    const $fader = wrapper.find("#grid-container-scroll-x").at(0);
    $fader.props().onValueChange(7);
    const state = wrapper.state();
    expect(state.max).to.deep.equal({ columns: 3, rows: 3 });
    expect(state.offset).to.deep.equal({ column: 7, row: 0 });
  });
	it("never exceeds the row count set by the outside word", () => {

    td.when(Element.prototype.getBoundingClientRect())
      .thenReturn({
        width: 200,
        height: 200
      });
    const wrapper = mount(<GridContainer
      columns={8}
      rows={8}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </GridContainer>);
    const $fader = wrapper.find("#grid-container-scroll-y").at(0);
    $fader.props().onValueChange(7);
    const state = wrapper.state();
    expect(state.max).to.deep.equal({ columns: 3, rows: 3 });
    expect(state.offset).to.deep.equal({ column: 0, row: 7 });
  });
});