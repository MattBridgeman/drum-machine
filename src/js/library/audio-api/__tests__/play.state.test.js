import { expect } from "chai";
import { normalisedIndex } from "../play.state";

describe("normalisedIndex", () => {
	it("returns 0", () => {
    let playState = {
      currentSegmentIndex: 0,
      currentBarIndex: 0,
      isPlaying: true,
      looping: true
    };
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4
    };
    let index = 0;
		let actualIndex = normalisedIndex(playState, tempo, index);
		
		expect(actualIndex).to.deep.equal(0);
	});

	it("returns 1", () => {
    let playState = {
      currentSegmentIndex: 1,
      currentBarIndex: 0,
      isPlaying: true,
      looping: true
    };
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4
    };
    let index = 1;
		let actualIndex = normalisedIndex(playState, tempo, index);
		
		expect(actualIndex).to.deep.equal(1);
	});

	it("returns 15", () => {
    let playState = {
      currentSegmentIndex: 15,
      currentBarIndex: 0,
      isPlaying: true,
      looping: true
    };
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4
    };
    let index = 15;
		let actualIndex = normalisedIndex(playState, tempo, index);
		
		expect(actualIndex).to.deep.equal(15);
	});

	it("loops and returns 0", () => {
    let playState = {
      currentSegmentIndex: 16,
      currentBarIndex: 0,
      isPlaying: true,
      looping: true
    };
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4
    };
    let index = 16;
		let actualIndex = normalisedIndex(playState, tempo, index);
		
		expect(actualIndex).to.deep.equal(0);
	});

	it("loops and returns 1", () => {
    let playState = {
      currentSegmentIndex: 17,
      currentBarIndex: 0,
      isPlaying: true,
      looping: true
    };
    let tempo = {
      beatsPerMinute: 120,
      beatsPerBar: 4,
      segmentsPerBeat: 4
    };
    let index = 17;
		let actualIndex = normalisedIndex(playState, tempo, index);
		
		expect(actualIndex).to.deep.equal(1);
  });
});