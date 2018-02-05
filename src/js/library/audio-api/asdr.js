//TODO:
//what resolution do we want to call this at? 10ms intervals?
//output
//{ phase: "attack", value: 100, time: 1234 }
//should this yeild intermediate values?
export const MAX_VALUE = 100;

export let asdr = (keyPressed, elapsedTime, {
    attack,
    decay,
    sustain,
    release
  }, {
    phase = "attack",
    value = 0,
    time = 0
  }) => {
  switch(phase) {
    case "attack":
    value += 0.01 * ((100 - attack) * elapsedTime)
    if(value >= MAX_VALUE) {
      phase = "decay"
    }
    break;
  }
  return {
    phase,
    value,
    time: time + elapsedTime
  };
};

// [1,1,1,1,1,1,1,1].reduce(({ phase, value, time }, elapsed) => {
//   let next = asdr(true, elapsed, { attack: 0.1 }, { phase, value, time });
//   console.log(next);
//   return next;
// });