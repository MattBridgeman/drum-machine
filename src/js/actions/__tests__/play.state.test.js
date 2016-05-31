import { expect } from "chai";
import { newBarIndex } from "../play.state.actions";
import { NEW_BAR_INDEX } from "../../constants/play.state.constants";

describe("Tempo actions", function() {

	it("Expect newBarIndex to return an new bar index action", function() {
		var action = newBarIndex(3);

		expect(action).to.deep.equal({
			type: NEW_BAR_INDEX,
			value: 3
		});
	});
});