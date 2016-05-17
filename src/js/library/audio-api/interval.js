import * as Rx from "rx";

export var createIntervalStream = (startTime, getNow, getIntervalTime, callback, cancelCallback) => Rx.Observable.create(function (observer) {
	let frameId,
		loop,
		tick;

	loop = function() {
		let now = getNow();
		let deltaTime = now - startTime;
		let interval = getIntervalTime();

		if(deltaTime >= interval) {
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
		if(!cancelCallback) return;
        cancelCallback(frameId);
    };
});