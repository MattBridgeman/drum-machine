import { expect } from "chai";
import { Header } from "../header.react";
import React from "react";
import { mount } from "enzyme";
import td from "testdouble";
import { MemoryRouter } from 'react-router';

describe("Header", () => {
	it("renders the Header with header and content", () => {
    const dispatchSpy = td.function();
    const wrapper = mount(<MemoryRouter>
      <Header
        dispatch={dispatchSpy}
        meta={{}}
        track={{
          write: false
        }}
        auth={false}
      />
    </MemoryRouter>);
    expect(wrapper.exists(".header")).to.be.true;
  });
});