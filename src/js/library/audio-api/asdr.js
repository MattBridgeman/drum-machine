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
    value += 0.01 * (attack * elapsedTime)
    if(value >= MAX_VALUE) {
      phase = "decay"
    }
    break;
  }
  return {
    phase,
    value,
    time
  };
  //elapsed time: 0
  //attack 0 -> gain = 100
  //attack 100 -> gain = 0

  //elapsed time: 2000ms
  //attack 0 -> gain = 100
  //attack 100 -> gain = 100
};