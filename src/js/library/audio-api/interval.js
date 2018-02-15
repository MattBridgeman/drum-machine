import { Observable } from "rxjs";

let { create } = Observable;

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
      
      observer.next(index);
      
      time += ms;
      index++;
      timeoutId = window.setTimeout(timeout, (ms - diff));
    };
    
    timeout();

    return () => window.clearTimeout(timeoutId);
  });
};

export let timeout = {
	get: () => new Promise(window.requestAnimationFrame)
};