import { drumMachine } from "./drum.machine";

export let cache = {};

export let updateInstrumentAudio = (state) => {
  let idCache = {};
  let { instruments } = state;
  instruments.map(instrument => {
    let item = cache[instrument.id];
    if(item) return item;
    let machine;
    switch(instrument.type) {
      case "drumMachine":
        machine = drumMachine(instrument);
      default:
        machine = null;
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
  