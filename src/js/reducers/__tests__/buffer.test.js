import { expect } from "chai";
import buffer from "../buffer.reducer";
import {
    NEW_BUFFER_SEGMENT,
    CLEAR_BUFFER_SEGMENTS,
    CLEAR_BUFFER_SEGMENT
} from "../../constants/buffer.constants";

describe("Buffer reducer", () => {
	it("adds a new buffer", () => {
    let initialState = [];
    let nextState = buffer(initialState, {
      type: NEW_BUFFER_SEGMENT,
      index: 0,
      time: 1234
    });
    expect(nextState[0].index).to.equal(0);
    expect(nextState[0].time).to.equal(1234);
  });

	it("clears all buffers", () => {
    let initialState = [{
      index: 0,
      time: 1234
    }];
    let nextState = buffer(initialState, {
      type: CLEAR_BUFFER_SEGMENTS
    });
    expect(nextState.length).to.equal(0);
  });

	it("clear buffer by id", () => {
    let initialState = [{
      index: 0,
      id: 1,
      time: 1234
    }];
    let nextState = buffer(initialState, {
      type: CLEAR_BUFFER_SEGMENT,
      id: 1
    });
    expect(nextState.length).to.equal(0);
  });
});