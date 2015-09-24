import {expect} from "chai";
import tempo from "../tempo.reducer";
import { INCREMENT_BPM, DECREMENT_BPM } from '../../constants/drum.machine.constants';

describe("Tempo reducer", function() {
	it("Expect tempo to increase to 121", function() {
		const initialState = {
			tempo: {
				beatsPerMinute: 120,
				beatsPerBar: 4,
				segmentsPerBeat: 4
			}
		};
		
		const action = {
			type: INCREMENT_BPM
		};
		
		const nextState = tempo(initialState, action);
		
		expect(initialState.tempo.beatsPerMinute).to.equal(120);
		expect(nextState.tempo.beatsPerMinute).to.equal(121);
	});
});