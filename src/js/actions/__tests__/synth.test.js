import { expect } from "chai";
import {
  changeSynthParam
} from "../synth.actions";

import {
  CHANGE_SYNTH_PARAM
} from "../../constants/synth.constants";

describe("Synth actions", () => {
	
	it("Expect changeSynthParam to return correct object", () => {
    let machineId = 0;
    let param = "osc1";
    let paramItem = "semitone";
		let value = 10;
		let action = changeSynthParam(machineId, param, paramItem, value);

		expect(action).to.deep.equal({
			type: CHANGE_SYNTH_PARAM,
      machineId,
      param,
      paramItem,
			value
		});
  });
});