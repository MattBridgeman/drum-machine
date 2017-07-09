import Rx from "rxjs/Rx";
import ogen from "../generator/ogen";

export var createIntervalStream = (getNow, getIntervalTime, callback, cancelCallback) => Rx.Observable.create(function (observer) {
	let frameId,
		loop,
		tick,
		prevTime;

	loop = function() {
		let now = getNow();
		prevTime = prevTime || now;
		let deltaTime = now - prevTime;
		let interval = getIntervalTime() / 1000;
		let bufferLength = interval / 2;

		if(deltaTime >= bufferLength) {
			observer.onNext(prevTime + interval);
			prevTime = prevTime + interval;
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

export let intervalGenerator = function*(shouldContinue, timeout, callback){
	while(shouldContinue()){
		yield timeout().then(callback);
	}
};

export let intervalStream = (...args) => () => ogen(intervalGenerator(...args));