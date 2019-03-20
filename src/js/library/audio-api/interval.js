import { Observable } from "rxjs";

let { create } = Observable;
const MAX_ALLOWED_INTERVAL = 1000;

export let intervalGenerator = function*(shouldContinue, timeout){
	while(shouldContinue()){
		yield timeout();
	}
};

export let adjustingInterval = ms => {
  return create(observer => {
    let timeoutId,
        start = new Date().getTime(),
        time = 0,
        index = 0;
    let timeout = () => {

      let diff = (new Date().getTime() - start) - time;
      let normalisedDiff = diff;
      //slow rate if large diff
      if(diff > MAX_ALLOWED_INTERVAL) {
        normalisedDiff = 0;
      }
      observer.next(index);
      if(diff > MAX_ALLOWED_INTERVAL) {
        time += diff;
      } else {
        time += ms;
      }
      index++;
      timeoutId = window.setTimeout(timeout, (ms - normalisedDiff));
    };
    
    timeout();

    return () => window.clearTimeout(timeoutId);
  });
};

export let timeout = {
	get: () => new Promise(window.requestAnimationFrame)
};