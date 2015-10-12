import {expect} from "chai";
import tempo from "../tempo.reducer";
import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM } from '../../constants/drum.machine.constants';

describe("Tempo reducer", function() {
	function getInitialState(){
		return {
			beatsPerMinute: 120,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};
	}
	
	it("Expect tempo to increase to 121", function() {
		const initialState = getInitialState();
		
		const action = {
			type: INCREMENT_BPM
		};
		
		const nextState = tempo(initialState, action);
		
		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(121);
	});
	
	it("Expect tempo to decrease to 119", function() {
		const initialState = getInitialState();
		
		const action = {
			type: DECREMENT_BPM
		};
		
		const nextState = tempo(initialState, action);
		
		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(119);
	});
	
	it("Expect tempo to change by set amount", function() {
		const initialState = getInitialState();
		
		const action = {
			type: CHANGE_BPM_BY_AMOUNT,
			amount: 4
		};
		
		const nextState = tempo(initialState, action);
		
		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(124);
	});
	
	it("Expect tempo to change to a set amount", function() {
		const initialState = getInitialState();
		
		const action = {
			type: CHANGE_BPM,
			value: 100
		};
		
		const nextState = tempo(initialState, action);
		
		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(100);
	});
	
});