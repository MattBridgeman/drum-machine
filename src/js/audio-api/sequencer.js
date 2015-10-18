import * as Rx from "Rx";
import { getSegmentTimeInMilliseconds } from "./tempo";

export var createSegmentStream = store => Rx.Observable.create(function (observer) {
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