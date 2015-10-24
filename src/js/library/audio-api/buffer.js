import { arrayBuffer } from "../request/arraybuffer";
import * as Rx from "Rx";

export function loadSounds(store){
	let state = store.getState();
	let soundKeys = Object.keys(state.sounds);
	let soundPaths = soundKeys.map(key => state.sounds[key].path);
	return soundPaths.map(arrayBuffer);
}

export var segmentsBufferStream = (getPreviousBuffer, getNow, getIntervalTime, callback) => Rx.Observable.create(function (observer) {
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
        cancelAnimationFrame(frameId);
    };
});