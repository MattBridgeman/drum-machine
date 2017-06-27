import { expect } from "chai";
import { newBufferSegment, clearBufferSegments, clearBufferSegment } from "../buffer.actions";
import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS, CLEAR_BUFFER_SEGMENT } from "../../constants/buffer.constants";

describe("Buffer actions", function() {

	it("newBufferSegment returns corresponding action", function() {
		var action = newBufferSegment(0, 1234);

		expect(action).to.deep.equal({
			type: NEW_BUFFER_SEGMENT,
      index: 0,
			time: 1234
		});
	});

	it("clearBufferSegments returns corresponding action", function() {
		var action = clearBufferSegments();

		expect(action).to.deep.equal({
			type: CLEAR_BUFFER_SEGMENTS
		});
	});

	it("clearBufferSegment returns corresponding action", function() {
		var action = clearBufferSegment(123);

		expect(action).to.deep.equal({
			type: CLEAR_BUFFER_SEGMENT,
			id: 123
		});
	});
});