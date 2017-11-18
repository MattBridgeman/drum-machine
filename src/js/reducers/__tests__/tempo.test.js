import {expect} from "chai";
import tempo from "../tempo.reducer";
import { INCREMENT_BPM, DECREMENT_BPM, CHANGE_BPM_BY_AMOUNT, CHANGE_BPM, MIN_BEATS_PER_MINUTE, MAX_BEATS_PER_MINUTE } from "../../constants/tempo.constants";
import { NEW_TRACK_LOADING, NEW_TRACK_LOADED, LOAD_DEFAULT_TRACK } from "../../constants/track.constants";

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

	it("Expect tempo not to increase beyond max", function() {
		const initialState = {
			beatsPerMinute: MAX_BEATS_PER_MINUTE,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};

		const action = {
			type: INCREMENT_BPM
		};

		const nextState = tempo(initialState, action);

		expect(initialState.beatsPerMinute).to.equal(MAX_BEATS_PER_MINUTE);
		expect(nextState.beatsPerMinute).to.equal(MAX_BEATS_PER_MINUTE);
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

	it("Expect tempo not to decrease below min", function() {
		const initialState = {
			beatsPerMinute: MIN_BEATS_PER_MINUTE,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};

		const action = {
			type: DECREMENT_BPM
		};

		const nextState = tempo(initialState, action);

		expect(initialState.beatsPerMinute).to.equal(MIN_BEATS_PER_MINUTE);
		expect(nextState.beatsPerMinute).to.equal(MIN_BEATS_PER_MINUTE);
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

	it("Expect tempo not to exceed max BPM when changed by set amount", function() {
		const initialState = getInitialState();

		const action = {
			type: CHANGE_BPM_BY_AMOUNT,
			amount: 100
		};

		const nextState = tempo(initialState, action);

		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(MAX_BEATS_PER_MINUTE);
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

	it("Expect tempo not to go below min BPM when BPM changed to set amount", function() {
		const initialState = getInitialState();

		const action = {
			type: CHANGE_BPM,
			value: MIN_BEATS_PER_MINUTE - 10
		};

		const nextState = tempo(initialState, action);

		expect(initialState.beatsPerMinute).to.equal(120);
		expect(nextState.beatsPerMinute).to.equal(MIN_BEATS_PER_MINUTE);
	});

	it("default state on track load", function() {
		const initialState = {
			beatsPerMinute: 144,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};

		const action = {
			type: NEW_TRACK_LOADING
		};

		const nextState = tempo(initialState, action);

		expect(nextState.beatsPerMinute).to.equal(120);
	});
	
	it("loads tempo defaults", function() {
		const initialState = {
			beatsPerMinute: 144,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};

		const action = {
			type: LOAD_DEFAULT_TRACK
		};

		const nextState = tempo(initialState, action);

		expect(nextState.beatsPerMinute).to.equal(120);
	});
	
	it("returns new track load", function() {
		const _tempo = {
			beatsPerMinute: 144,
			beatsPerBar: 4,
			segmentsPerBeat: 4
		};

		const action = {
			type: NEW_TRACK_LOADED,
			tempo: _tempo
		};

		const nextState = tempo({}, action);

		expect(nextState.beatsPerMinute).to.equal(144);
	});

});