import * as Rx from "Rx";

export var segments = Rx.Observable.create(function (observer) {
	let startTime = new Date().getTime(),
		segmentTime = 250,
		deltaTime,
		now,
		frameId;
	
	function loop() {
		if(!deltaTime){
			observer.onNext(1);
		}
		now = new Date().getTime()
		deltaTime = now - startTime;
		if(deltaTime >= segmentTime) {
			observer.onNext(1);
			startTime = now;
		}
		tick();
	}
	
	function tick() {
		frameId = requestAnimationFrame(loop);
	}
	
	loop();

    return function () {
        cancelAnimationFrame(frameId);
    };
});