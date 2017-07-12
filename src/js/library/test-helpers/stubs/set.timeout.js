import td from "testdouble";

let queue = [];

export let GlobalSetTimeoutTick = function(){
  let queueLength = queue.length;
  queue
    .forEach((item, index) => {
      if(index < queueLength) {
        item();
      }
    });
  queue = queue
    .filter((item, index) => index >= queueLength);
};

export let GlobalSetTimeout = window.setTimeout = function(callback){
  queue.push(callback);
};