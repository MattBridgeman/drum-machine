import { expect } from "chai";
import { GridAxis, GridAxisItem } from "../grid.react";
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

describe("GridAxisItem", () => {
	it("renders 2 child items for GridAxisItem x", () => {
    const wrapper = mount(<GridAxisItem type="x">
      <div></div>
    </GridAxisItem>);
    expect(wrapper.exists(".grid-axis-item-x div")).to.equal(true);
  });
});