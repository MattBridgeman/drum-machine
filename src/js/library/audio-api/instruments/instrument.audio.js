import { drumMachine } from "./drum.machine";

export let cache = {};

export let updateInstrumentAudio = (state) => {
  let idCache = {};
  let { instruments } = state;
  instruments.map(instrument => {
    let { id, type } = instrument;
    let item = cache[id];
    if(item) return item;
    let machine;
    switch(type) {
      case "drumMachine":
        machine = drumMachine();
        break;
      default:
        machine = null;
        break;
    }
    return {
      instrument,
      machine
    };
  })
  .forEach(({ instrument, machine }) => {
    let item = cache[instrument.id] = {
      instrument,
      machine
    };
    machine.update(instrument, state);
  });
}
  