import * as Rx from "Rx";

export var createSegmentStream = (startTime, getNow, getSegmentTime, callback) => Rx.Observable.create(function (observer) {
	let frameId,
		loop,
		tick;

	loop = function() {
		let now = getNow();
		let deltaTime = now - startTime;
		let segmentTime = getSegmentTime();
		
		if(deltaTime >= segmentTime) {
			observer.onNext(1);
			startTime = now;
		}
		tick();
	};

	tick = function() {
		frameId = callback(loop);
	};

	loop();

    return function () {
        cancelAnimationFrame(frameId);
    };
});