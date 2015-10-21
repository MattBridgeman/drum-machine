import { PLAY, TOGGLE_PLAY_PAUSE, NEW_SEGMENT_INDEX } from "../constants/play.state.constants";
import { getSegmentsToBuffer } from "../library/audio-api/tempo";

export let createBufferStream = (getSegmentTime) => Rx.Observable.create(function (observer) {
	let startTime = new Date().getTime(),
		frameId,
		loop,
		tick;

	loop = function() {
		if(!frameId){
			observer.onNext(1);
		}
		let now = new Date().getTime();
		let deltaTime = now - startTime;
		
		let state = store.getState();
		let { beatsPerMinute, segmentsPerBeat } = state.tempo;
		let segmentTime = getSegmentTimeInMilliseconds(beatsPerMinute, segmentsPerBeat);
		
		if(deltaTime >= segmentTime) {
			observer.onNext(1);
			startTime = now;
		}
		tick();
	};

	tick = function() {
		frameId = requestAnimationFrame(loop);
	};

	loop();

    return function () {
        cancelAnimationFrame(frameId);
    };
});