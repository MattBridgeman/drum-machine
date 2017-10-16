import { expect } from "chai";
import { incrementBPM, decrementBPM, changeBPMByAmount, changeBPMToAmount } from "../tempo.actions";
import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM } from "../../constants/tempo.constants";

describe("Tempo actions", function() {

	it("Expect incrementBPM to return an increment BPM action", function() {
		var action = incrementBPM();

		expect(action).to.deep.equal({
			type: INCREMENT_BPM
		});
	});

	it("Expect decrementBPM to return a decrement BPM action", function() {
		var action = decrementBPM();

		expect(action).to.deep.equal({
			type: DECREMENT_BPM
		});
	});

	it("Expect changeBPMByAmount to return change BPM by amount action", function() {
		var action = changeBPMByAmount(99);

		expect(action).to.deep.equal({
			type: CHANGE_BPM_BY_AMOUNT,
			amount: 99
		});
	});

	it("Expect changeBPMToAmount to return change BPM action", function() {
		var action = changeBPMToAmount(101);

		expect(action).to.deep.equal({
			type: CHANGE_BPM,
			value: 101
		});
	});
});